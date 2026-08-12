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

export type TenantTheme = {
  colors: TenantColors;
  fonts: TenantFonts;
  radius: string;
  logoPath: string;
  /** Optional; defaults to logoPath. Prefer a square 32–512px PNG under public/tenants/<id>/ */
  faviconPath?: string;
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
  mapsUrl?: string;
};

export type TenantMeta = {
  title: string;
  description: string;
};

export type TenantConfig = {
  id: string;
  brand: TenantBrand;
  theme: TenantTheme;
  contact: TenantContact;
  meta: TenantMeta;
};
