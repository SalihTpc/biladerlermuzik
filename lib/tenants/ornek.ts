import type { TenantConfig } from "./types";

/** İkinci tenant şablonu — yeni deploy için kopyala / özelleştir */
export const ornekTenant: TenantConfig = {
  id: "ornek",
  brand: {
    name: "Örnek Müzik",
    shortName: "Örnek",
    tagline: "Tenant şablonu — marka sloganınız",
    about: "Bu tenant için hakkımızda metnini lib/tenants/ornek.ts içinde güncelleyin.",
  },
  theme: {
    colors: {
      bg: "#12151a",
      surface: "#e8eaed",
      text: "#12151a",
      textMuted: "#5a6170",
      textOnAccent: "#ffffff",
      accent: "#2f6fed",
      nav: "#1a1f28",
      navHover: "#2a3340",
      border: "#cfd3da",
    },
    fonts: {
      display: "var(--font-display), Georgia, serif",
      body: "var(--font-body), system-ui, sans-serif",
    },
    radius: "0.5rem",
    logoPath: "/tenants/ornek/logo.png",
  },
  contact: {
    email: "info@ornek.example",
    phone: "+90 XXX XXX XX XX",
    address: "Adres buraya",
  },
  meta: {
    title: "Örnek Müzik",
    description: "Örnek tenant — site açıklaması",
  },
};
