import Link from "next/link";
import { getTenant } from "@/lib/tenants";
import type { TenantContact } from "@/lib/tenants/types";

type SocialKey = Extract<
  keyof TenantContact,
  "whatsapp" | "instagram" | "facebook" | "tiktok" | "youtube"
>;

const socialLinks: {
  key: SocialKey;
  label: string;
  icon: string;
}[] = [
  { key: "whatsapp", label: "WhatsApp", icon: "fa-brands fa-whatsapp" },
  { key: "instagram", label: "Instagram", icon: "fa-brands fa-instagram" },
  { key: "facebook", label: "Facebook", icon: "fa-brands fa-facebook-f" },
  { key: "tiktok", label: "TikTok", icon: "fa-brands fa-tiktok" },
  { key: "youtube", label: "YouTube", icon: "fa-brands fa-youtube" },
];

const tenant = getTenant();

export default function Footer() {
  const { brand, contact } = tenant;
  const year = new Date().getFullYear();
  const activeSocial = socialLinks.filter((item) => {
    const href = contact[item.key];
    return typeof href === "string" && href.length > 0;
  });

  return (
    <footer className="site-footer">
      <div className="page-frame site-footer__inner">
        <p className="site-footer__copy">
          © {year} {brand.shortName}
          <span className="site-footer__sep" aria-hidden>
            ·
          </span>
          <Link href="/iletisim">İletişim</Link>
        </p>

        {activeSocial.length > 0 ? (
          <ul className="site-footer__social">
            {activeSocial.map(({ key, label, icon }) => (
              <li key={key}>
                <a
                  className={`site-footer__social-link site-footer__social-link--${key}`}
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
        ) : null}
      </div>
    </footer>
  );
}
