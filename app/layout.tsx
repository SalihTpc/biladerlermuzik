import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import "../assets/fontawesome-6.1.2/css/all.min.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import NewButton from "@/components/NewBaglama";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bilader Müzik",
  description: "Biladerler Müzik Evi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <div className="min-h-screen bg-slate-400">
              <Navbar />

              <main className="sm:px-16 px-4 mt-3">
                <NewButton />
                {children}
              </main>
            </div>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
