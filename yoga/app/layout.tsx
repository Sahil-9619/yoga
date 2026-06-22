import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saargamm Bhartiye",
  description: "Your pranayama and meditation guide",
};

import LayoutWrapper from "./components/layout/LayoutWrapper";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomerService } from "./services/customer.service";
import { UserLogout } from "./components/UserLogout";
import FloatingContact from "./components/FloatingContact";
import YogaPopup from "./components/YogaPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <YogaPopup/>
        <ScrollProgress />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <UserLogout />
        <FloatingContact/>
      </body>
    </html>
  );
}
