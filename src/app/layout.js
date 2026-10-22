import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

// Hayyakum Allah is the single typeface used across the whole site
const hayyakumAllah = localFont({
  src: [
    { path: "../../public/fonts/HayyakumAllah-Light.ttf", weight: "300" },
    { path: "../../public/fonts/HayyakumAllah-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/HayyakumAllah-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/HayyakumAllah-Bold.ttf", weight: "700" },
  ],
  variable: "--font-hayyakum",
  // No fallback fonts: hold text until Hayyakum Allah loads rather than show another face
  display: "block",
  adjustFontFallback: false,
});

export const metadata = {
  title: "STUDIO AJID — Contemporary Architecture & Spatial Practice",
  description: "Monolithic architecture, spatial direction, and structural serenity. Riyadh — Dubai — London.",
  keywords: ["Studio Ajid", "Architecture", "Contemporary Architecture", "Riyadh Architecture", "Luxury Villa", "Monolithic Architecture"],
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the inline script adds "js" to <html> before React
    // loads, which lets scroll reveals hide their content without a flash
    <html lang="en" className={hayyakumAllah.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="bg-[#09090b] text-[#edece6] antialiased selection:bg-[#d4af37] selection:text-black overflow-x-hidden font-sans">
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
