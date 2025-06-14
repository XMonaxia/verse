import "../style/globals.css";
import type { Metadata } from "next";
import { faustina, merienda, nosifer } from "./fonts/fonts";
import { ScrollProvider } from "@/components/Provider/ScrollContent";
import { defaultMetadata } from "@/lib/seo/metadata";
import MusicWrapper from "@/components/Provider/MusicWrapper";
import Logo from "@/components/Sticky/Logo";
import Look from "@/components/Sticky/Look";
import Top from "@/components/Sticky/Top";
import ListMusic from "@/components/Music/ListMusic";
import Headers from "@/components/Header/Headers";
import ToasterProvider from "@/components/Provider/ToasterWrapper";
import { AuthProvider } from "@/components/Provider/AuthWrapper";

export const metadata: Metadata = defaultMetadata;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${faustina.variable} ${merienda.variable} ${nosifer.variable}`}
      >
        <ToasterProvider />
        <ScrollProvider>
          <MusicWrapper>
            <AuthProvider>
              <Headers />
              {children}
            </AuthProvider>
            <ListMusic />
            <Logo />
            <Look />
            <div className="w-100 flex-col item-c">
              <Top />
            </div>
          </MusicWrapper>
        </ScrollProvider>
      </body>
    </html>
  );
}
