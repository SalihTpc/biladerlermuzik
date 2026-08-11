import AuthGuard from "@/components/AuthGuard";
import BaglamaForm from "@/components/BaglamaForm";
import PageShell from "@/components/PageShell";

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
