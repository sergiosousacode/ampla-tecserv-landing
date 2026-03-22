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