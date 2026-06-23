import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata = {
  title: {
    default: "Ampla TecServ | Suporte e Assessoria em TI",
    template: "%s | Ampla TecServ",
  },
  description:
    "Suporte técnico e assessoria em TI para empresas. Estabilidade, segurança e crescimento tecnológico.",
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
  sameAs: [
    "https://www.linkedin.com/in/sergiosousa-tec/"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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