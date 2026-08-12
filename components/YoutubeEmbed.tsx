"use client";

import { getYoutubeEmbedUrl } from "@/lib/youtube";

type Props = {
  url: string;
  title?: string;
};

export default function YoutubeEmbed({ url, title = "Bağlama videosu" }: Props) {
  const embedUrl = getYoutubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <section className="detail-video">
      <div className="detail-video__frame">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
