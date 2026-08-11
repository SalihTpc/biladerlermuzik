import { biladerlerTenant } from "./biladerler";
import { ornekTenant } from "./ornek";
import type { TenantConfig } from "./types";

const tenants: Record<string, TenantConfig> = {
  [biladerlerTenant.id]: biladerlerTenant,
  [ornekTenant.id]: ornekTenant,
};

export type { TenantConfig } from "./types";

export function getTenantId(): string {
  return process.env.NEXT_PUBLIC_TENANT_ID?.trim() || "biladerler";
}

export function getTenant(): TenantConfig {
  const id = getTenantId();
  const tenant = tenants[id];
  if (!tenant) {
    throw new Error(
      `Unknown NEXT_PUBLIC_TENANT_ID="${id}". Registered: ${Object.keys(tenants).join(", ")}`,
    );
  }
  return tenant;
}

export function listTenantIds(): string[] {
  return Object.keys(tenants);
}
