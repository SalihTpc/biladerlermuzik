import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { getTenant } from "@/lib/tenants";
import type { TenantContact } from "@/lib/tenants/types";
import { pageMetadata } from "@/lib/seo";

type SocialKey = Extract<
  keyof TenantContact,
  "instagram" | "facebook" | "tiktok" | "youtube"
>;

const socialLinks: {
  key: SocialKey;
  label: string;
  icon: string;
}[] = [
  { key: "instagram", label: "Instagram", icon: "fa-brands fa-instagram" },
  { key: "facebook", label: "Facebook", icon: "fa-brands fa-facebook-f" },
  { key: "tiktok", label: "TikTok", icon: "fa-brands fa-tiktok" },
  { key: "youtube", label: "YouTube", icon: "fa-brands fa-youtube" },
];

const tenant = getTenant();

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  description: `${tenant.brand.name} iletişim — telefon, e-posta, WhatsApp ve sosyal medya hesapları.`,
  path: "/iletisim",
});

const page = () => {
  const { contact, brand } = tenant;
  const activeSocial = socialLinks.filter((item) => {
    const href = contact[item.key];
    return typeof href === "string" && href.length > 0;
  });
  const hasMap = Boolean(contact.mapsEmbedUrl);
  const mapsHref = contact.mapsUrl;

  return (
    <PageShell className="contact-page page-shell--fit-screen">
      <header className="page-header contact-page__header">
        <h1 className="font-display">İletişim</h1>
        <p>
          {brand.name} ile iletişime geçin. Mağazamızı ziyaret edebilir veya
          sosyal medya üzerinden yazabilirsiniz.
        </p>
      </header>

      <div
        className={`contact-layout${hasMap ? " contact-layout--with-map" : ""}`}
      >
        {hasMap && contact.mapsEmbedUrl ? (
          <div className="contact-map">
            <iframe
              className="contact-map__iframe"
              src={contact.mapsEmbedUrl}
              title={`${brand.name} konumu`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {mapsHref ? (
              <a
                className="contact-map__overlay"
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brand.name} konumunu Google Haritalar’da aç`}
              />
            ) : null}
          </div>
        ) : null}

        <div className="contact-aside">
          <section className="contact-methods" aria-label="İletişim bilgileri">
            {mapsHref ? (
              <a
                className="contact-method contact-method--address"
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-method__icon" aria-hidden>
                  <i className="fa-solid fa-location-dot" />
                </span>
                <span className="contact-method__body">
                  <span className="contact-method__label">Adres</span>
                  <span className="contact-method__value">
                    <span className="contact-method__place">{brand.name}</span>
                    <span className="contact-method__street">
                      {contact.address}
                    </span>
                  </span>
                </span>
                <i
                  className="fa-solid fa-arrow-up-right-from-square contact-method__chevron"
                  aria-hidden
                />
              </a>
            ) : (
              <div className="contact-method contact-method--static contact-method--address">
                <span className="contact-method__icon" aria-hidden>
                  <i className="fa-solid fa-location-dot" />
                </span>
                <span className="contact-method__body">
                  <span className="contact-method__label">Adres</span>
                  <span className="contact-method__value">
                    <span className="contact-method__place">{brand.name}</span>
                    <span className="contact-method__street">
                      {contact.address}
                    </span>
                  </span>
                </span>
              </div>
            )}

            <a
              className="contact-method"
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
            >
              <span className="contact-method__icon" aria-hidden>
                <i className="fa-solid fa-phone" />
              </span>
              <span className="contact-method__body">
                <span className="contact-method__label">Telefon</span>
                <span className="contact-method__value">{contact.phone}</span>
              </span>
            </a>

            <a className="contact-method" href={`mailto:${contact.email}`}>
              <span className="contact-method__icon" aria-hidden>
                <i className="fa-solid fa-envelope" />
              </span>
              <span className="contact-method__body">
                <span className="contact-method__label">E-posta</span>
                <span className="contact-method__value">{contact.email}</span>
              </span>
            </a>

            {contact.whatsapp ? (
              <a
                className="contact-method contact-method--accent"
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-method__icon" aria-hidden>
                  <i className="fa-brands fa-whatsapp" />
                </span>
                <span className="contact-method__body">
                  <span className="contact-method__label">WhatsApp</span>
                  <span className="contact-method__value">
                    Hemen mesaj gönder
                  </span>
                </span>
              </a>
            ) : null}
          </section>

          {activeSocial.length > 0 ? (
            <section className="contact-social" aria-label="Sosyal medya">
              <h2 className="contact-social__title font-display">
                Sosyal medya
              </h2>
              <p className="contact-social__lead text-muted">
                Bizi takip edin, yeniliklerden haberdar olun.
              </p>
              <ul className="contact-social__list">
                {activeSocial.map(({ key, label, icon }) => (
                  <li key={key}>
                    <a
                      className={`contact-social__link contact-social__link--${key}`}
                      href={contact[key] as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                    >
                      <i className={icon} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
};

export default page;
