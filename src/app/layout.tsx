import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/context/ThemeContext";
import { CursorProvider } from "@/context/CursorContext";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Pravin K — Full Stack Developer";
const DESCRIPTION =
  "Portfolio of Pravin K, a full stack developer building fast, thoughtful products with Next.js, TypeScript & Node.js.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pravin671231.dev"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Pravin K — Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Resolves dark/light theme before hydration to avoid a flash — see
            docs/DESIGN-TOKENS.md "Theming mechanism". String constant only,
            no request-time data, so this is safe. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CursorProvider>
            <SmoothScrollProvider>
              <CustomCursor />
              <CommandPalette />
              <Navbar />
              {children}
              <Footer />
            </SmoothScrollProvider>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
