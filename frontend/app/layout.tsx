import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import TopNavBar from "./components/topNavBar";
import { UserProvider } from "./lib/UserContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cloud Game Services",
    description: "Game servers for everyone 🎮, pay for what you need and nothing else",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


return (
    <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text`}
        >
            <UserProvider>
                <TopNavBar />
                {children}
            </UserProvider>
        </body>
    </html>
);
}
