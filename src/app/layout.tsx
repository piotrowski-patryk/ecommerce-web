import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/index.css";
import Header from "@/components/common/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Web",
  description:
    "Aplikacja e-commerce zbudowana z wykorzystaniem Next.js, React, TypeScript i Tailwind CSS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />

        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
