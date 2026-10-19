import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/index.css";
import Header from "@/components/common/header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
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
      className={`${poppins.variable} h-full antialiased`}
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
