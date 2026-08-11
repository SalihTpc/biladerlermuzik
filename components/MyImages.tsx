"use client";

import { Image } from "antd";

const MyImages = ({ images }: { images: string[] }) => {
  if (!images?.length) return null;

  return (
    <div className="detail-gallery">
      <Image.PreviewGroup items={images}>
        <div className="detail-gallery__main">
          <Image
            src={images[0]}
            alt=""
            style={{ width: "100%", height: "auto" }}
            preview={{ src: images[0] }}
          />
        </div>
        {images.length > 1 ? (
          <div className="detail-gallery__thumbs">
            {images.slice(1).map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                style={{ width: "100%", height: "auto" }}
                preview={{ src }}
              />
            ))}
          </div>
        ) : null}
      </Image.PreviewGroup>
    </div>
  );
};

export default MyImages;
