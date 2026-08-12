import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { getTenant } from "@/lib/tenants";
import { pageMetadata, truncateMeta } from "@/lib/seo";

const tenant = getTenant();

export const metadata: Metadata = pageMetadata({
  title: "Hakkımızda",
  description: truncateMeta(tenant.brand.about || tenant.meta.description),
  path: "/hakkimizda",
});

const page = () => {
  return (
    <PageShell className="about-page page-shell--fit-screen">
      <header className="page-header">
        <h1 className="font-display">Hakkımızda</h1>
        <p>{tenant.brand.name}</p>
      </header>
      <div className="prose-block">
        <p>{tenant.brand.about}</p>
      </div>
    </PageShell>
  );
};

export default page;
