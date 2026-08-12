import { activeTenant } from "./active";
import { listTenantIds, TENANT_REGISTRY } from "./registry";
import type { TenantConfig } from "./types";

export type { TenantConfig } from "./types";
export { listTenantIds, TENANT_REGISTRY };

export function getTenantId(): string {
  return process.env.NEXT_PUBLIC_TENANT_ID?.trim() || activeTenant.id;
}

export function getTenant(): TenantConfig {
  const id = getTenantId();
  if (id !== activeTenant.id) {
    throw new Error(
      `NEXT_PUBLIC_TENANT_ID="${id}" does not match generated active tenant "${activeTenant.id}". Run: npm run tenant:use -- ${id}`,
    );
  }
  return activeTenant;
}

/** Prefer icons.ico / icons.png32, then faviconPath, otherwise tenant logo. */
export function getTenantFaviconPath(tenant: TenantConfig = activeTenant): string {
  const icons = tenant.theme.icons;
  const fromIcons = icons?.ico?.trim() || icons?.png32?.trim();
  return fromIcons || tenant.theme.faviconPath?.trim() || tenant.theme.logoPath;
}
