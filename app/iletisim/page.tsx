import PageShell from "@/components/PageShell";
import { getTenant } from "@/lib/tenants";

const page = () => {
  const tenant = getTenant();
  const { contact, brand } = tenant;

  return (
    <PageShell>
      <header className="page-header">
        <h1 className="font-display">İletişim</h1>
        <p>{brand.name} ile iletişime geçin.</p>
      </header>
      <ul className="contact-list">
        <li>
          <span className="text-muted" style={{ display: "block", fontSize: "0.8rem" }}>
            Adres
          </span>
          {contact.mapsUrl ? (
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
              {contact.address}
            </a>
          ) : (
            <span>{contact.address}</span>
          )}
        </li>
        <li>
          <span className="text-muted" style={{ display: "block", fontSize: "0.8rem" }}>
            Telefon
          </span>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
        </li>
        <li>
          <span className="text-muted" style={{ display: "block", fontSize: "0.8rem" }}>
            E-posta
          </span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        {contact.whatsapp ? (
          <li>
            <span className="text-muted" style={{ display: "block", fontSize: "0.8rem" }}>
              WhatsApp
            </span>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              Mesaj gönder
            </a>
          </li>
        ) : null}
        {contact.youtube ? (
          <li>
            <span className="text-muted" style={{ display: "block", fontSize: "0.8rem" }}>
              YouTube
            </span>
            <a href={contact.youtube} target="_blank" rel="noopener noreferrer">
              Kanalı ziyaret et
            </a>
          </li>
        ) : null}
      </ul>
    </PageShell>
  );
};

export default page;
