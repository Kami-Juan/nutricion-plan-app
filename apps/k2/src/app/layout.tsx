import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KamiHealth | Tu App de Nutrición",
  appleWebApp: {
    title: "KamiHealth"
  },
  description:
    "Obtén un plan nutricional personalizado y alcanza tus metas de salud. Recetas saludables, seguimiento de progreso y más.",
  keywords: [
    "plan nutricional",
    "nutrición personalizada",
    "recetas saludables",
    "dieta",
    "alimentación",
    "salud",
    "bienestar",
    "fitness"
  ],
  authors: [{ name: "Kami", url: "https://www.linkedin.com/in/juanddios/" }],
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }]
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
