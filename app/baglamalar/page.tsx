import BaglamaCard from "@/components/BaglamaCard";
import PageShell from "@/components/PageShell";
import { getBaglamalar } from "@/firebase.config";
import { Baglama } from "@/lib/Interfaces";

export const dynamic = "force-dynamic";

async function getData() {
  const res = getBaglamalar();
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res;
}

const page = async () => {
  const data = await getData();
  return (
    <PageShell>
      <header className="page-header">
        <h1 className="font-display">Bağlamalar</h1>
        <p>Mağazadaki bağlamaları inceleyin; detay ve ses için ürüne tıklayın.</p>
      </header>
      <div className="baglama-grid">
        {data.map((dat: Baglama) => (
          <BaglamaCard
            key={dat.id}
            description={dat.description}
            title={dat.title}
            image={dat.images[0]}
            fiyat={dat.fiyat}
          />
        ))}
      </div>
    </PageShell>
  );
};

export default page;
