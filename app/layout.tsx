import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "../assets/fontawesome-6.1.2/css/all.min.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import NewButton from "@/components/NewBaglama";
import { getTenant } from "@/lib/tenants";
import { themeToCssVars } from "@/lib/theme/cssVars";
import ThemeProvider from "@/lib/theme/ThemeProvider";
import type { CSSProperties } from "react";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const tenant = getTenant();

export const metadata: Metadata = {
  title: tenant.meta.title,
  description: tenant.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cssVars = themeToCssVars(tenant.theme) as CSSProperties;

  return (
    <html
      lang="tr"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      style={cssVars}
    >
      <body className={bodyFont.className}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={tenant.theme}>
            <AuthProvider>
              <div className="site-shell">
                <Navbar />
                <main className="site-main">
                  <NewButton />
                  {children}
                </main>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
