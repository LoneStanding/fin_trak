import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { inter } from './ui/fonts';
import { fred } from './ui/fonts';

import TopNav from "./_components/TopNav";

export const metadata = {
  title: "FinTrak",
  description: "Generated by Aadarsh Param Akhouri",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${fred.className} antialiased`}>
      <body>
        <TopNav />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
