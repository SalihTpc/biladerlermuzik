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
      // Logo: koyu zemin, turuncu gitarlar, krem orta gitar, teal dalgalar, kırmızı çizgiler
      bg: "#1a1a1a",
      surface: "#f3ebe0",
      text: "#1a1a1a",
      textMuted: "#5c5650",
      textOnAccent: "#1a1a1a",
      accent: "#e89b1a",
      nav: "#121212",
      navHover: "#2a2a2a",
      border: "#d8cfc2",
    },
    fonts: {
      display: "var(--font-display), Georgia, serif",
      body: "var(--font-body), system-ui, sans-serif",
    },
    radius: "0.5rem",
    logoPath: "/tenants/bestekar/logo.png",
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
