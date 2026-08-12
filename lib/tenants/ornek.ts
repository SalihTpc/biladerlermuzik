import type { TenantConfig } from "./types";

/** İkinci tenant şablonu — yeni deploy için kopyala / özelleştir; registry.json’a da ekle (docs/TENANTS.md) */
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
    // faviconPath: "/tenants/ornek/favicon.png", // opsiyonel; yoksa logo kullanılır
  },
  contact: {
    email: "info@ornek.example",
    phone: "+90 XXX XXX XX XX",
    address: "Adres buraya",
    // whatsapp: "https://wa.me/90XXXXXXXXXX",
    // instagram: "https://www.instagram.com/...",
    // facebook: "https://www.facebook.com/...",
    // tiktok: "https://www.tiktok.com/@...",
    // youtube: "https://www.youtube.com/@...",
    // mapsUrl: "https://maps.app.goo.gl/...",
    // mapsEmbedUrl: "https://www.google.com/maps/embed?pb=...",
  },
  meta: {
    title: "Örnek Müzik",
    description: "Örnek tenant — site açıklaması",
  },
};
