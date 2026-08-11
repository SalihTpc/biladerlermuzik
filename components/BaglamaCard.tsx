"use client";
import { modifyString } from "@/lib/genFunc";
import { Card } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  image: string;
  description: string;
  fiyat: number;
};

const BaglamaCard = ({ title, image, description, fiyat }: Props) => {
  const router = useRouter();
  const priceLabel =
    typeof fiyat === "number" && !Number.isNaN(fiyat)
      ? new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
          maximumFractionDigits: 0,
        }).format(fiyat)
      : null;

  return (
    <Card
      hoverable
      className="baglama-card"
      styles={{ body: { padding: "0.85rem 1rem 1rem" } }}
      cover={
        // eslint-disable-next-line @next/next/no-img-element
        <img className="baglama-card__cover" alt={title} src={image} />
      }
      onClick={() =>
        router.push(`/baglamalar/${modifyString(title)}`, { scroll: false })
      }
    >
      <Card.Meta title={title} description={description} />
      {priceLabel ? <p className="baglama-card__price">{priceLabel}</p> : null}
    </Card>
  );
};

export default BaglamaCard;
