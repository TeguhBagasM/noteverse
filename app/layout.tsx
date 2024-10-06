import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToasterProvider } from "@/providers/toast-provider";
import NavbarServer from "@/components/navbar/navbar-server";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Noteverse",
  description: "Created by Thiever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToasterProvider />
        <NavbarServer />
        <main>{children}</main>
      </body>
    </html>
  );
}
