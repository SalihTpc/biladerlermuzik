import type { Metadata } from "next";
import BaglamaCatalog from "@/components/BaglamaCatalog";
import PageShell from "@/components/PageShell";
import { getBaglamalar } from "@/firebase.config";
import { Baglama } from "@/lib/Interfaces";
import { getTenant } from "@/lib/tenants";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const tenant = getTenant();

export const metadata: Metadata = pageMetadata({
  title: "Bağlamalar",
  description: `${tenant.brand.name} bağlamaları — stoktaki bağlamaları inceleyin, detay ve ses için ürüne tıklayın.`,
  path: "/baglamalar",
});

async function getData(): Promise<{ items: Baglama[]; error: string | null }> {
  try {
    const items = await getBaglamalar();
    return { items, error: null };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === "permission-denied") {
      return {
        items: [],
        error:
          "Firestore izin hatası: baglama koleksiyonu okunamıyor. Firebase Console → Firestore → Rules içinde public read açılmalı.",
      };
    }
    return {
      items: [],
      error: err.message || "Bağlamalar yüklenemedi",
    };
  }
}

const page = async () => {
  const { items, error } = await getData();
  return (
    <PageShell>
      <header className="page-header">
        <h1 className="font-display">Bağlamalar</h1>
        <p>Mağazadaki bağlamaları inceleyin; detay ve ses için ürüne tıklayın.</p>
      </header>
      {error ? (
        <p className="text-muted" role="alert">
          {error}
        </p>
      ) : items.length === 0 ? (
        <p className="text-muted">Henüz listelenecek bağlama yok.</p>
      ) : (
        <BaglamaCatalog items={items} />
      )}
    </PageShell>
  );
};

export default page;
