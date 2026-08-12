import type { Metadata } from "next";
import AuthGuard from "@/components/AuthGuard";
import BaglamaForm from "@/components/BaglamaForm";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Bağlama ekle",
  description: "Yeni bağlama kaydı oluşturun.",
  path: "/baglamalar/ekle",
  noIndex: true,
});

const page = () => {
  return (
    <AuthGuard>
      <PageShell>
        <header className="page-header">
          <h1 className="font-display">Bağlama ekle</h1>
          <p>Yeni bağlama kaydı oluşturun</p>
        </header>
        <div className="auth-panel baglama-form-panel">
          <BaglamaForm />
        </div>
      </PageShell>
    </AuthGuard>
  );
};

export default page;
