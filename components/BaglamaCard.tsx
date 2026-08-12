"use client";

import Link from "next/link";
import { modifyString } from "@/lib/genFunc";
import { Card } from "antd";

type Props = {
  title: string;
  image: string;
  description: string;
  fiyat: number;
};

const BaglamaCard = ({ title, image, description, fiyat }: Props) => {
  const priceLabel =
    typeof fiyat === "number" && !Number.isNaN(fiyat)
      ? new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
          maximumFractionDigits: 0,
        }).format(fiyat)
      : null;

  const href = `/baglamalar/${modifyString(title)}`;

  return (
    <Link href={href} className="baglama-card-link" scroll={false}>
      <Card
        hoverable
        className="baglama-card"
        styles={{ body: { padding: "0.85rem 1rem 1rem" } }}
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img className="baglama-card__cover" alt={title} src={image} />
        }
      >
        <Card.Meta title={title} description={description} />
        {priceLabel ? <p className="baglama-card__price">{priceLabel}</p> : null}
      </Card>
    </Link>
  );
};

export default BaglamaCard;
