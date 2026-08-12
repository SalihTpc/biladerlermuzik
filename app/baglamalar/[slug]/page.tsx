import PageShell from "@/components/PageShell";
import BaglamaDetail from "@/components/BaglamaDetail";
import { getBaglama } from "@/firebase.config";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const baglama = await getBaglama(slug);
  if (!baglama) notFound();

  return (
    <PageShell>
      <BaglamaDetail baglama={baglama} />
    </PageShell>
  );
};

export default page;
