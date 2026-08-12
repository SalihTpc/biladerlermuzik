import type { Metadata } from "next";
import { Fraunces, Nunito, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "../assets/fontawesome-6.1.2/css/all.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { AuthProvider } from "@/context/AuthContext";
import NewButton from "@/components/NewBaglama";
import { getTenant } from "@/lib/tenants";
import { themeToCssVars } from "@/lib/theme/cssVars";
import ThemeProvider from "@/lib/theme/ThemeProvider";
import { buildOrganizationJsonLd, buildRootMetadata } from "@/lib/seo";
import type { CSSProperties } from "react";

const biladerlerDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const biladerlerBody = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bestekarDisplay = Nunito({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800"],
});

const bestekarBody = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "600", "700"],
});

const tenant = getTenant();

const fontsByTenant = {
  biladerler: { display: biladerlerDisplay, body: biladerlerBody },
  bestekar: { display: bestekarDisplay, body: bestekarBody },
} as const;

const fonts =
  fontsByTenant[tenant.id as keyof typeof fontsByTenant] ??
  fontsByTenant.biladerler;

export const metadata: Metadata = buildRootMetadata(tenant);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cssVars = themeToCssVars(tenant.theme) as CSSProperties;

  return (
    <html
      lang="tr"
      className={`${fonts.display.variable} ${fonts.body.variable}`}
      style={cssVars}
    >
      <body className={fonts.body.className}>
        <JsonLd data={buildOrganizationJsonLd(tenant)} />
        <StyledComponentsRegistry>
          <ThemeProvider theme={tenant.theme}>
            <AuthProvider>
              <div className="site-shell">
                <Navbar />
                <main className="site-main">
                  <NewButton />
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
