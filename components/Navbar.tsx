"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../app/icon.png";
import { signIn, signOut, useSession } from "next-auth/react";
import "./Navbar.css";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
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
        <div className="max-sm:hidden flex gap-2">
          {session ? (
            <>
              <p className="hover:text-slate-200">
                {session?.user?.name || session.user?.email}{" "}
              </p>
              <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <p className="hover:text-slate-200">Bilarderler Müzik</p>
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
