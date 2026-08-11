/** YouTube watch / shorts / youtu.be / embed URL → video id */
export function getYoutubeVideoId(url: string): string | null {
  if (!url?.trim()) return null;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (
        parts[0] === "embed" ||
        parts[0] === "shorts" ||
        parts[0] === "live" ||
        parts[0] === "v"
      ) {
        return parts[1] || null;
      }
    }
  } catch {
    const match = url.match(
      /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/,
    );
    return match?.[1] ?? null;
  }
  return null;
}

export function getYoutubeEmbedUrl(url: string): string | null {
  const id = getYoutubeVideoId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?rel=0`;
}
