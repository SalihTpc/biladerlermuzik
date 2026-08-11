import PageShell from "@/components/PageShell";
import { getTenant } from "@/lib/tenants";

const page = () => {
  const tenant = getTenant();

  return (
    <PageShell>
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
