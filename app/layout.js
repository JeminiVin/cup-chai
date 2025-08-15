import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChaiPeeneWale-Because Life Begins After Chai",
  description: "Tandoor Se Cup Tak, Kadak Chai Ka Safar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='bg-[#000000] [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white'
      >
         <SessionWrapper>
          <Navbar />
          <div className="min-h-screen bg-[#000000] [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
            {children}
          </div>
          <Footer />
         </SessionWrapper>
      </body>
    </html>
  );
}
