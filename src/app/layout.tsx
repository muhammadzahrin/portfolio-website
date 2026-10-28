import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PS3Background } from '@/components/layout/PS3Background';
import { DebugPanel } from '@/components/ui/DebugPanel';

/**
 * "Emotion Engine" by Neale Davidson / Pixel Sagas (pixelsagas.com).
 * Freeware for personal, non-commercial use; web embedding is permitted.
 * Used for the "Zahrin" label on the project case spines.
 */
const emotionEngine = localFont({
  src: [
    { path: './fonts/EmotionEngine.otf', weight: '400', style: 'normal' },
    { path: './fonts/EmotionEngine-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-emotion-engine',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Zahrin | Personal Portfolio',
  description:
    'Personal portfolio of Zahrin - Diploma in Information Technology student at UniKL MIIT, intern at SD Guthrie Berhad, and aspiring game developer.',
  keywords: [
    'Zahrin',
    'Portfolio',
    'UniKL MIIT',
    'SD Guthrie Berhad',
    'Game Development',
    'Expired Game',
    'Web Development',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${emotionEngine.variable}`}>
      <body className="flex flex-col min-h-screen selection:bg-sky-500/20 selection:text-sky-100 text-slate-100">
        <PS3Background />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <DebugPanel />
      </body>
    </html>
  );
}
