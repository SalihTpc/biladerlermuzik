import type { TenantConfig } from "./types";

export const biladerlerTenant: TenantConfig = {
  id: "biladerler",
  brand: {
    name: "Biladerler Müzik",
    shortName: "Biladerler",
    tagline: "Ankara Keçiören’de bağlama ve müzik ekipmanları",
    about:
      "2018 yılından bu yana Ankara Keçiören’de bağlama ve araç gereçleri satışı ile tüm bağlama dostlarına hizmet vermekteyiz. Satışlarımızı mağazamızdan fiziki olarak yapmaktayız. Ayrıca YouTube üzerinde düzenli olarak bağlama tanıtım ve satış videoları yayınlamaktayız. Bu videolar sayesinde alacağınız bağlamanın sesini dinleyip daha rahat inceleme fırsatı elde etmiş oluyorsunuz.",
  },
  theme: {
    colors: {
      bg: "#1c1814",
      surface: "#ebe4d6",
      text: "#1c1814",
      textMuted: "#5c5348",
      textOnAccent: "#1c1814",
      accent: "#c9a227",
      nav: "#2a221c",
      navHover: "#3d3228",
      border: "#d4cbb8",
    },
    fonts: {
      display: "var(--font-display), Georgia, serif",
      body: "var(--font-body), system-ui, sans-serif",
    },
    radius: "0.5rem",
    logoPath: "/tenants/biladerler/logo.png",
  },
  contact: {
    email: "info@biladerlermuzik.com",
    phone: "+90 XXX XXX XX XX",
    address: "Keçiören, Ankara",
    youtube: "https://www.youtube.com",
  },
  meta: {
    title: "Biladerler Müzik",
    description: "Biladerler Müzik Evi — bağlama ve müzik ekipmanları",
  },
};
