import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Giriş",
  description: "Hesabınıza giriş yapın.",
  path: "/login",
  noIndex: true,
});

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
