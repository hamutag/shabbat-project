import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./Providers";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-frank",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "פרויקט השבת - שתי שבתות של אחדות וגאולה",
    template: "%s | פרויקט השבת",
  },
  description:
    "הצטרפו לתנועה הלאומית לחיזוק עם ישראל. בחרו צעד רוחני אחד, קבלו ליווי אישי, מצאו שיעורי תורה קרובים, והיו חלק משינוי אמיתי.",
  keywords: [
    "פרויקט השבת",
    "שמירת שבת",
    "התחזקות",
    "יהדות",
    "שיעורי תורה",
    "אמונה",
    "תפילין",
    "כשרות",
    "קירוב",
  ],
  openGraph: {
    title: "פרויקט השבת - שתי שבתות של אחדות וגאולה",
    description:
      "כל יהודי. צעד אחד. אור גדול. הצטרפו לתנועה לחיזוק עם ישראל.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} ${frankRuhl.variable} font-[family-name:var(--font-heebo)] antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
