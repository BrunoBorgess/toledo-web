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
  title: {
    default: "Dr. Toledo Jr. | Harmonização Facial em São José do Rio Preto",
    template: "%s | Dr. Toledo Jr.",
  },

  description:
    "Especialista em harmonização facial em São José do Rio Preto. Procedimentos modernos, seguros e com resultados naturais. Agende sua avaliação.",

  keywords: [
    "harmonização facial São José do Rio Preto",
    "botox Rio Preto",
    "preenchimento labial Rio Preto",
    "estética facial",
    "Dr Toledo harmonização",
  ],

  authors: [{ name: "Dr. Toledo Jr." }],
  creator: "Dr. Toledo Jr.",

  metadataBase: new URL("https://drtoledoharmonizacao.com.br"),

  openGraph: {
    title: "Dr. Toledo Jr. | Harmonização Facial",
    description:
      "Resultados naturais e sofisticados em harmonização facial. Atendimento em São José do Rio Preto.",
    url: "https://drtoledoharmonizacao.com.br",
    siteName: "Dr. Toledo Jr.",
    images: [
      {
        url: "https://drtoledoharmonizacao.com.br/dr-toledo-2.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
