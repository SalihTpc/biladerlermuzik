"use client";
import { Image } from "antd";
import React from "react";

const MyImages = ({ images }: { images: string[] }) => {
  return (
    <Image.PreviewGroup items={images}>
      <Image width={600} src={images[0]} preview={{ src: images[0] }} />
    </Image.PreviewGroup>
  );
};

export default MyImages;
