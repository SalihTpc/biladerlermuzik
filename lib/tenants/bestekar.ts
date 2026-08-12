import type { TenantConfig } from "./types";

export const bestekarTenant: TenantConfig = {
  id: "bestekar",
  brand: {
    name: "Bestekar Müzik",
    shortName: "Bestekar",
    tagline: "...müziğe dair herşey...",
    about:
      "Bestekar Müzik — müziğe dair her şey. Enstrüman, ekipman ve müzik tutkunları için güvenilir adres.",
  },
  theme: {
    colors: {
      // Logo: charcoal zemin, turuncu gitarlar, teal dalgalar, kırmızı çizgiler, beyaz yazı
      bg: "#1e1e1e",
      surface: "#f4faf9",
      text: "#1e1e1e",
      textMuted: "#4d5c5a",
      textOnAccent: "#ffffff",
      accent: "#0f9e94",
      nav: "#141414",
      navHover: "#2c2c2c",
      border: "#c5d9d6",
    },
    fonts: {
      display: "var(--font-display), 'Segoe UI', system-ui, sans-serif",
      body: "var(--font-body), system-ui, sans-serif",
    },
    radius: "0.75rem",
    logoPath: "/tenants/bestekar/logo.jpg",
    icons: {
      ico: "/tenants/bestekar/favicon.ico",
      png16: "/tenants/bestekar/favicon-16x16.png",
      png32: "/tenants/bestekar/favicon-32x32.png",
      apple: "/tenants/bestekar/apple-touch-icon.png",
      android192: "/tenants/bestekar/android-chrome-192x192.png",
      android512: "/tenants/bestekar/android-chrome-512x512.png",
    },
  },
  contact: {
    email: "info@bestekarmuzik.com",
    phone: "+90 538 828 17 24",
    address: "Cebeci, Hacettepe, Talatpaşa Blv 136-D, 06340 Altındağ/Ankara",
    whatsapp: "https://wa.me/905388281724",
    instagram: "https://www.instagram.com/bestekar_muzik",
    facebook: "https://www.facebook.com/bestekarmuzik",
    tiktok: "https://www.tiktok.com/@bestekar.muzik",
    mapsUrl: "https://maps.app.goo.gl/CGXk9HBgUQPjG1aX9",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.340075475206!2d32.86904987617034!3d39.93378217152137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34fbc1255ba49%3A0x2313f41b9e502df0!2sBestekar%20M%C3%BCzik!5e0!3m2!1str!2str!4v1786560923072!5m2!1str!2str",
  },
  meta: {
    title: "Bestekar Müzik",
    description:
      "Bestekar Müzik — müziğe dair her şey. Enstrüman, bağlama ve müzik ekipmanları için güvenilir adres.",
    keywords: [
      "Bestekar Müzik",
      "bağlama",
      "enstrüman",
      "müzik ekipmanları",
      "Ankara müzik",
    ],
  },
};
