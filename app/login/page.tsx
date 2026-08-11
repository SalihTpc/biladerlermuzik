import LoginForm from "@/components/LoginForm";
import PageShell from "@/components/PageShell";

const page = () => {
  return (
    <PageShell>
      <header className="page-header" style={{ textAlign: "center" }}>
        <h1 className="font-display">Giriş</h1>
        <p>Hesabınıza giriş yapın</p>
      </header>
      <div className="auth-panel">
        <LoginForm />
      </div>
    </PageShell>
  );
};

export default page;
