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
    logoPath: "/tenants/bestekar/logo.png",
    // faviconPath: "/tenants/bestekar/favicon.png", // opsiyonel; yoksa logo kullanılır
  },
  contact: {
    email: "info@bestekarmuzik.com",
    phone: "+90 XXX XXX XX XX",
    address: "Adres buraya",
  },
  meta: {
    title: "Bestekar Müzik",
    description: "Bestekar Müzik — müziğe dair her şey",
  },
};
