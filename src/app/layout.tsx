import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CVIProvider } from "@/components/cvi/components/cvi-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReplicloneAI - AI-Powered Virtual Sales Representatives",
  description: "Create AI-powered avatars that act as virtual sales representatives. Deliver tailored pitches, engage customers in real-time, handle objections, and close sales—all with a no-code interface.",
  icons: {
    icon: "/Logo_ReplicloneAI.png",
    shortcut: "/Logo_ReplicloneAI.png",
    apple: "/Logo_ReplicloneAI.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CVIProvider>
          {children}
        </CVIProvider>
      </body>
    </html>
  );
}
