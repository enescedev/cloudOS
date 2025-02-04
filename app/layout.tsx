import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

// Font yüklemesini try-catch içine alıyoruz
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'arial'], // fallback fontları ekliyoruz
  adjustFontFallback: false, // bu özelliği kapatıyoruz
  display: 'optional' // font yüklemesi başarısız olursa sistem fontunu kullanır
})

export const metadata: Metadata = {
  title: 'Cloud Development Environment',
  description: 'A modern cloud development environment with integrated tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Font sınıfını güvenli bir şekilde alıyoruz
  const fontClass = inter?.className || ''

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className={`${fontClass} antialiased`}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}