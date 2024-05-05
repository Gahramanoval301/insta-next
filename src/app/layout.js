import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Instragram Clone",
  description: "A clone of instagram with Next.js, Tailwind.css, Socket.io, Firebase",
};

export default function RootLayout({ children }) {
  return (

    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
