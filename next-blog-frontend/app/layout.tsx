import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: {
        default: "My Blog",
        template: "%s | My Blog",
    },
    description: "Next.js + Strapi Blog",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "My Blog",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@yourhandle",
    },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
            <nav className="p-4 border-b
                bg-white text-black
                dark:bg-[#111] dark:text-white
                flex items-center gap-4">

                <Link href="/" className="underline">Home</Link>
                <Link href="/search" className="underline">Search</Link>
                <ThemeToggle/>
            </nav>

            <main className="min-h-screen">
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
