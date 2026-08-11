"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../app/icon.png";
import "./Navbar.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="z-10 sm:px-16 px-4">
      <Link
        href="/"
        className="title flex items-center justify-center no-underline h-fit"
      >
        <Image
          src={logo}
          width={70}
          height={70}
          alt="Logo"
          className="mr-3 bg-white rounded-lg hover:scale-110 transition ease-in-out duration-300"
          title="Anasayfa"
        />
        <div className="max-sm:hidden flex gap-2 items-center">
          {loading ? null : user ? (
            <>
              <Link href="/profile" className="hover:text-slate-200">
                {user.displayName || user.email}
              </Link>
              <button type="button" onClick={() => logout()}>
                Çıkış
              </button>
            </>
          ) : (
            <>
              <p className="hover:text-slate-200 m-0">Biladerler Müzik</p>
              <Link href="/login" className="hover:text-slate-200">
                Giriş
              </Link>
            </>
          )}
        </div>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li className={pathname === "/baglamalar" ? "isActive" : ""}>
          <Link
            className="transition ease-in-out duration-200"
            href="/baglamalar"
          >
            Bağlamalar
          </Link>
        </li>
        <li className={pathname === "/hakkimizda" ? "isActive" : ""}>
          <Link
            className="transition ease-in-out duration-200"
            href="/hakkimizda"
          >
            Hakkımızda
          </Link>
        </li>
        <li className={pathname === "/iletisim" ? "isActive" : ""}>
          <Link
            className="transition ease-in-out duration-200"
            href="/iletisim"
          >
            İletişim
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
