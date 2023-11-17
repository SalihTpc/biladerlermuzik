import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "../assets/fontawesome-6.1.2/css/all.min.css";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bilader Müzik",
  description: "Biladerler Müzik Evi",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <SessionProvider session={session}>
            <div className="min-h-screen bg-slate-400">
              <Navbar />
              <main className="sm:px-16 px-4 mt-3">{children}</main>
            </div>
          </SessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
