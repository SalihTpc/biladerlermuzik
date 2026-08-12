import type { Metadata } from "next";
import { getTenant, getTenantFaviconPath } from "@/lib/tenants";
import type { TenantConfig, TenantIcons } from "@/lib/tenants/types";

/** Canonical site origin for the active tenant build. Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncateMeta(text: string, max = 160): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

function buildIconsMetadata(
  icons: TenantIcons | undefined,
  fallback: string,
): NonNullable<Metadata["icons"]> {
  if (!icons) {
    return {
      icon: [{ url: fallback }],
      shortcut: fallback,
      apple: fallback,
    };
  }

  const iconEntries: Array<{
    url: string;
    sizes?: string;
    type?: string;
  }> = [];

  if (icons.ico?.trim()) {
    iconEntries.push({ url: icons.ico.trim(), sizes: "any" });
  }
  if (icons.png16?.trim()) {
    iconEntries.push({
      url: icons.png16.trim(),
      sizes: "16x16",
      type: "image/png",
    });
  }
  if (icons.png32?.trim()) {
    iconEntries.push({
      url: icons.png32.trim(),
      sizes: "32x32",
      type: "image/png",
    });
  }
  if (icons.android192?.trim()) {
    iconEntries.push({
      url: icons.android192.trim(),
      sizes: "192x192",
      type: "image/png",
    });
  }
  if (icons.android512?.trim()) {
    iconEntries.push({
      url: icons.android512.trim(),
      sizes: "512x512",
      type: "image/png",
    });
  }

  const shortcut =
    icons.ico?.trim() || icons.png32?.trim() || fallback;
  const apple = icons.apple?.trim() || fallback;

  return {
    icon: iconEntries.length ? iconEntries : [{ url: fallback }],
    shortcut,
    apple: [{ url: apple, sizes: "180x180", type: "image/png" }],
  };
}

export function buildRootMetadata(tenant: TenantConfig = getTenant()): Metadata {
  const siteUrl = getSiteUrl();
  const favicon = getTenantFaviconPath(tenant);
  const logo = absoluteUrl(tenant.theme.logoPath);
  const title = tenant.meta.title;
  const description = truncateMeta(tenant.meta.description);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${tenant.brand.shortName}`,
    },
    description,
    keywords: tenant.meta.keywords,
    applicationName: tenant.brand.name,
    authors: [{ name: tenant.brand.name }],
    creator: tenant.brand.name,
    publisher: tenant.brand.name,
    category: "music",
    alternates: {
      canonical: "/",
    },
    icons: buildIconsMetadata(tenant.theme.icons, favicon),
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: siteUrl,
      siteName: tenant.brand.name,
      title,
      description,
      images: [
        {
          url: logo,
          alt: tenant.brand.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [logo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "format-detection": "telephone=yes",
    },
  };
}

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const tenant = getTenant();
  const url = absoluteUrl(opts.path);
  const description = truncateMeta(opts.description);
  const image = opts.image
    ? opts.image.startsWith("http")
      ? opts.image
      : absoluteUrl(opts.image)
    : absoluteUrl(tenant.theme.logoPath);

  return {
    title: opts.title,
    description,
    alternates: {
      canonical: opts.path,
    },
    openGraph: {
      title: `${opts.title} | ${tenant.brand.shortName}`,
      description,
      url,
      siteName: tenant.brand.name,
      locale: "tr_TR",
      type: "website",
      images: [{ url: image, alt: opts.title }],
    },
    twitter: {
      card: opts.image ? "summary_large_image" : "summary",
      title: `${opts.title} | ${tenant.brand.shortName}`,
      description,
      images: [image],
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function buildOrganizationJsonLd(tenant: TenantConfig = getTenant()) {
  const sameAs = [
    tenant.contact.instagram,
    tenant.contact.facebook,
    tenant.contact.tiktok,
    tenant.contact.youtube,
    tenant.contact.whatsapp,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "MusicStore",
    name: tenant.brand.name,
    alternateName: tenant.brand.shortName,
    description: tenant.meta.description,
    url: getSiteUrl(),
    logo: absoluteUrl(tenant.theme.logoPath),
    image: absoluteUrl(tenant.theme.logoPath),
    email: tenant.contact.email,
    telephone: tenant.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: tenant.contact.address,
      addressCountry: "TR",
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function buildProductJsonLd(opts: {
  name: string;
  description: string;
  image?: string;
  price?: number;
  url: string;
  brandName: string;
}) {
  const offer =
    typeof opts.price === "number" && !Number.isNaN(opts.price)
      ? {
          "@type": "Offer",
          priceCurrency: "TRY",
          price: opts.price,
          availability: "https://schema.org/InStock",
          url: opts.url,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: truncateMeta(opts.description || opts.name, 300),
    ...(opts.image ? { image: [opts.image] } : {}),
    brand: {
      "@type": "Brand",
      name: opts.brandName,
    },
    ...(offer ? { offers: offer } : {}),
  };
}
