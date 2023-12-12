import MyImages from "@/components/MyImages";
import { getBaglama, getBaglamalar } from "@/firebase.config";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const baglamalar = await getBaglamalar();
  return baglamalar.map((baglama) => ({
    slug: baglama.id,
  }));
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const baglama = await getBaglama(slug);
  if (!baglama) notFound();
  return (
    <div className="flex items-center justify-center">
      <div>
        {baglama.title}
        <p>{baglama.fiyat}</p>
        <MyImages images={baglama.images} />
      </div>
    </div>
  );
};

export default page;
