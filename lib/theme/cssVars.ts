import type { TenantTheme } from "@/lib/tenants/types";

export function themeToCssVars(
  theme: TenantTheme,
): Record<string, string> {
  return {
    "--color-bg": theme.colors.bg,
    "--color-surface": theme.colors.surface,
    "--color-text": theme.colors.text,
    "--color-text-muted": theme.colors.textMuted,
    "--color-text-on-accent": theme.colors.textOnAccent,
    "--color-accent": theme.colors.accent,
    "--color-nav": theme.colors.nav,
    "--color-nav-hover": theme.colors.navHover,
    "--color-border": theme.colors.border,
    "--font-display-family": theme.fonts.display,
    "--font-body-family": theme.fonts.body,
    "--radius": theme.radius,
  };
}
