import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import BaglamaDetail from "@/components/BaglamaDetail";
import JsonLd from "@/components/JsonLd";
import { getBaglama } from "@/firebase.config";
import { notFound } from "next/navigation";
import { getTenant } from "@/lib/tenants";
import {
  absoluteUrl,
  buildProductJsonLd,
  pageMetadata,
  truncateMeta,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baglama = await getBaglama(slug);
  if (!baglama) {
    return pageMetadata({
      title: "Bağlama bulunamadı",
      description: "İstenen bağlama kaydı bulunamadı.",
      path: `/baglamalar/${slug}`,
      noIndex: true,
    });
  }

  const description = truncateMeta(
    baglama.description?.trim() ||
      `${baglama.title} — ${getTenant().brand.name} stokunda.`,
  );

  return pageMetadata({
    title: baglama.title,
    description,
    path: `/baglamalar/${slug}`,
    image: baglama.images?.[0],
  });
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const baglama = await getBaglama(slug);
  if (!baglama) notFound();

  const tenant = getTenant();
  const productUrl = absoluteUrl(`/baglamalar/${slug}`);

  return (
    <PageShell>
      <JsonLd
        data={buildProductJsonLd({
          name: baglama.title,
          description: baglama.description,
          image: baglama.images?.[0],
          price: baglama.fiyat,
          url: productUrl,
          brandName: tenant.brand.name,
        })}
      />
      <BaglamaDetail baglama={baglama} />
    </PageShell>
  );
};

export default page;
