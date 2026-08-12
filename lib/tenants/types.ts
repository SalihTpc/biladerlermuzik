export type TenantColors = {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  textOnAccent: string;
  accent: string;
  nav: string;
  navHover: string;
  border: string;
};

export type TenantFonts = {
  /** CSS font-family stack for display / headings */
  display: string;
  /** CSS font-family stack for body */
  body: string;
};

/** Multi-size favicon set (e.g. RealFaviconGenerator output under public/tenants/<id>/) */
export type TenantIcons = {
  ico?: string;
  png16?: string;
  png32?: string;
  apple?: string;
  android192?: string;
  android512?: string;
};

export type TenantTheme = {
  colors: TenantColors;
  fonts: TenantFonts;
  radius: string;
  logoPath: string;
  /** Optional; defaults to logoPath. Prefer a square 32–512px PNG under public/tenants/<id>/ */
  faviconPath?: string;
  /** Optional multi-size set; preferred over faviconPath when present */
  icons?: TenantIcons;
};

export type TenantBrand = {
  name: string;
  shortName: string;
  tagline: string;
  about: string;
};

export type TenantContact = {
  email: string;
  phone: string;
  address: string;
  whatsapp?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  /** Google Maps / Apple Maps share link — opens when address or map is clicked */
  mapsUrl?: string;
  /** Google Maps embed iframe `src` for the contact page map */
  mapsEmbedUrl?: string;
};

export type TenantMeta = {
  title: string;
  description: string;
  /** Optional SEO keywords for the tenant */
  keywords?: string[];
};

export type TenantConfig = {
  id: string;
  brand: TenantBrand;
  theme: TenantTheme;
  contact: TenantContact;
  meta: TenantMeta;
};
