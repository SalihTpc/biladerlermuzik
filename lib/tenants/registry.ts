import registry from "./registry.json";

export type TenantRegistryEntry = {
  importPath: string;
  exportName: string;
};

export const TENANT_REGISTRY: Record<string, TenantRegistryEntry> = registry;

export function listTenantIds(): string[] {
  return Object.keys(TENANT_REGISTRY);
}
