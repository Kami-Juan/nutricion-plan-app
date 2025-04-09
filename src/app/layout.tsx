import { ThemeProvider } from '@/components/ui/theme-provider';

import Providers from './providers';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'KamiHealth | Tu App de Nutrición',
  appleWebApp: {
    title: 'KamiHealth',
  },
  description:
    'Obtén un plan nutricional personalizado y alcanza tus metas de salud. Recetas saludables, seguimiento de progreso y más.',
  keywords: [
    'plan nutricional',
    'nutrición personalizada',
    'recetas saludables',
    'dieta',
    'alimentación',
    'salud',
    'bienestar',
    'fitness',
  ],
  authors: [{ name: 'Kami', url: 'https://www.linkedin.com/in/juanddios/' }],
  openGraph: {
    title: 'KamiHealth | Tu App de Nutrición',
    description:
      'Obtén un plan nutricional personalizado y alcanza tus metas de salud. Recetas saludables, seguimiento de progreso y más.',
    url: 'https://www.linkedin.com/in/juanddios/',
    siteName: 'Tu App de Nutrición',
    images: [
      {
        url: '/icon0.svg', // Reemplaza con la URL de tu imagen OG
        width: 1200,
        height: 630,
        alt: 'Imagen representativa de la app de nutrición',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
