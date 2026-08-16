"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTenant } from "@/lib/tenants";

const tenant = getTenant();

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="site-nav">
      <div className="page-frame site-nav__inner">
        <div className="title">
          <Link href="/" className="nav-logo-link">
            <Image
              src={tenant.theme.logoPath}
              width={44}
              height={44}
              alt={tenant.brand.name}
              className="nav-logo"
              title="Anasayfa"
              priority
              loading="eager"
            />
          </Link>
          <div className="nav-brand-auth">
            {loading ? null : user ? (
              <>
                <Link href="/profile" className="nav-link-text">
                  {user.displayName || user.email}
                </Link>
                <button type="button" className="nav-link-text" onClick={() => logout()}>
                  Çıkış
                </button>
              </>
            ) : (
              <Link href="/" className="nav-brand-name no-underline text-inherit">
                {tenant.brand.name}
              </Link>
            )}
          </div>
        </div>
        <button
          type="button"
          className="menu"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={menuOpen ? "open" : ""}>
          <li className={pathname === "/baglamalar" ? "isActive" : ""}>
            <Link href="/baglamalar" onClick={() => setMenuOpen(false)}>
              Bağlamalar
            </Link>
          </li>
          <li className={pathname === "/hakkimizda" ? "isActive" : ""}>
            <Link href="/hakkimizda" onClick={() => setMenuOpen(false)}>
              Hakkımızda
            </Link>
          </li>
          <li className={pathname === "/iletisim" ? "isActive" : ""}>
            <Link href="/iletisim" onClick={() => setMenuOpen(false)}>
              İletişim
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
