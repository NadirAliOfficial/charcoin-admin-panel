import ProgressProvider from "@/components/custom/progress-provider";
import { SplashScreen } from "@/components/splash/screen";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const wfVisualSans = localFont({
  src: [
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-wfsans",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Charcoin - Solana NFT Marketplace Coin",
  description: "A progress web app to charcoin NFT marketplace",
  icons: [
    {
      url: "/favicon-logo.svg",
      href: "/favicon-logo.svg",
    },
  ],
  // manifest: `/manifest.json`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
        <meta name="theme-color" content="#00f0b5" />
        <meta property="og:title" content="Charcoin – Invest with Impact" />
        <meta property="og:description" content="Join the global movement of crypto-driven generosity. Track donations, support causes, and make your tokens count." />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${wfVisualSans.className} antialiased`}
      >
        {/* <ScrollArea className="max-h-screen  h-screen min-w-screen w-screen overflow-auto  whitespace-nowrap"> */}
        <Suspense fallback={<SplashScreen />}>
          <ProgressProvider>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </QueryProvider>
            <Toaster />
          </ProgressProvider>
        </Suspense>
        {/* </ScrollArea> */}
      </body>
    </html>
  );
}
