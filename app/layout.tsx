import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutShell } from "@/components/layout/layout-shell";
import messages from "@/messages/uz.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${messages.site.title} - ${messages.site.subtitle}`,
    template: `%s | ${messages.site.title}`,
  },
  description: messages.site.description,
  keywords: [
    "ERP",
    "CRM",
    "POS",
    "WMS",
    "1C",
    "BILLZ",
    "Didox",
    "Soliq.uz",
    "O'zbekiston biznes tizimlari",
    "Boshqaruv tizimlari",
  ],
  authors: [{ name: "TizimLug'at Jamoasi" }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://tizimlugat.uz",
    siteName: messages.site.title,
    title: `${messages.site.title} - ${messages.site.subtitle}`,
    description: messages.site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${messages.site.title} - ${messages.site.subtitle}`,
    description: messages.site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body-base bg-surface text-on-surface min-h-screen antialiased selection:bg-primary-container selection:text-on-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
