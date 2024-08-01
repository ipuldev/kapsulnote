import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Kapsul Note",
  description: "Kaspsulnote is your digital time capsule, where you can capture your thoughts and memories today, to inspire and connect with future generations. Share your stories and leave a lasting legacy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground bg-gray-200 flex min-h-screen">
          {children}
      </body>
    </html>
  );
}
