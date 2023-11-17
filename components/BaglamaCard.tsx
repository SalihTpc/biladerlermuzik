"use client";
import { modifyString } from "@/lib/genFunc";
import { Card } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  image: string;
  description: string;
  fiyat: number;
};

const BaglamaCard = ({ title, image, description }: Props) => {
  const router = useRouter();
  return (
    <Card
      hoverable
      className="w-[300px] h-[400px]"
      bodyStyle={{ padding: "0 2px 2px 2px" }}
      cover={<img alt={title} src={image} />}
      onClick={() =>
        router.push(`/baglamalar/${modifyString(title)}`, { scroll: false })
      }
    >
      <Card.Meta title={title} description={description} />
    </Card>
  );
};

export default BaglamaCard;
