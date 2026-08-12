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
