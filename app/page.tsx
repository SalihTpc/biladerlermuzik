import Link from "next/link";
import Image from "next/image";
import { getTenant } from "@/lib/tenants";
import PageShell from "@/components/PageShell";

export default function Home() {
  const tenant = getTenant();

  return (
    <div className="home-hero">
      <div className="home-hero__media" aria-hidden>
        <div className="home-hero__grain" />
        <div className="home-hero__veil" />
      </div>
      <PageShell>
        <div className="home-hero__content">
          <Image
            src={tenant.theme.logoPath}
            alt={tenant.brand.name}
            width={88}
            height={88}
            priority
            className="home-hero__mark"
          />
          <h1 className="home-hero__title font-display">{tenant.brand.name}</h1>
          <p className="home-hero__tagline">{tenant.brand.tagline}</p>
          <div className="home-hero__actions">
            <Link href="/baglamalar" className="btn-accent">
              Bağlamaları incele
            </Link>
            <Link href="/iletisim" className="btn-ghost home-hero__ghost">
              İletişim
            </Link>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
