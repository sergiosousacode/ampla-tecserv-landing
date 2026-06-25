import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://amplatecserv.com.br"),

  title: {
    default: "Ampla TecServ | Suporte e Assessoria em TI",
    template: "%s | Ampla TecServ",
  },

  description:
    "Suporte técnico, assessoria em TI, desenvolvimento de sistemas, automação comercial e assessoria ANVISA para empresas.",

  keywords: [
    "suporte em TI",
    "assessoria em TI",
    "consultoria em tecnologia",
    "suporte técnico empresarial",
    "desenvolvimento de sistemas",
    "automação comercial",
    "assessoria ANVISA",
    "consultoria ANVISA",
    "suporte de TI João Pessoa",
  ],

  verification: {
    google: "tqwMIQl0w7NZ9GKYyDr-mvfKB4shS83O_kMotZaB6K4",
  },

  openGraph: {
    title: "Ampla TecServ | Suporte e Assessoria em TI",
    description:
      "Soluções em suporte técnico, assessoria em TI, desenvolvimento de sistemas e consultoria ANVISA.",
    url: "https://amplatecserv.com.br",
    siteName: "Ampla TecServ",
    locale: "pt_BR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ampla TecServ",
  url: "https://amplatecserv.com.br",
  description:
    "Empresa especializada em suporte técnico, assessoria em TI, desenvolvimento de sistemas, automação comercial e assessoria ANVISA.",
  areaServed: "Brasil",
  address: {
    "@type": "PostalAddress",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    addressCountry: "BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-bg text-text transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <WhatsAppFloat />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
