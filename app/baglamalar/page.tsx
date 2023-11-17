import BaglamaCard from "@/components/BaglamaCard";
import { getBaglamalar } from "@/firebase.config";
import { Baglama } from "@/lib/Interfaces";

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
    <div className="flex items-center justify-center flex-wrap gap-4">
      {data.map((dat: Baglama) => (
        <div key={dat.id} className="">
          <BaglamaCard
            description={dat.description}
            title={dat.title}
            image={dat.images[0]}
            fiyat={dat.fiyat}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
