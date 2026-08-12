/** Build a wa.me link with a pre-filled inquiry that includes the product page URL. */
export function buildWhatsAppInquiryUrl(
  whatsappBase: string,
  opts: { title: string; url: string },
): string {
  const base = whatsappBase.trim().startsWith("http")
    ? whatsappBase.trim()
    : `https://${whatsappBase.trim()}`;
  const text = [
    "Merhaba, bu bağlama ile ilgileniyorum:",
    "",
    opts.title,
    opts.url,
  ].join("\n");
  const url = new URL(base);
  url.searchParams.set("text", text);
  return url.toString();
}
