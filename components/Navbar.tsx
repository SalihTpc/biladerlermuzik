"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "./Navbar.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTenant } from "@/lib/tenants";

const tenant = getTenant();

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="site-nav z-10 sm:px-16 px-4">
      <div className="title flex items-center justify-center no-underline h-fit gap-3">
        <Link href="/" className="flex items-center no-underline text-inherit">
          <Image
            src={tenant.theme.logoPath}
            width={56}
            height={56}
            alt={tenant.brand.name}
            className="nav-logo"
            title="Anasayfa"
          />
        </Link>
        <div className="nav-brand-auth flex gap-3 items-center">
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
            <>
              <Link href="/" className="nav-brand-name m-0 no-underline text-inherit">
                {tenant.brand.name}
              </Link>
              <Link href="/login" className="nav-link-text">
                Giriş
              </Link>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        className="menu"
        aria-label="Menüyü aç"
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
    </nav>
  );
};

export default Navbar;
