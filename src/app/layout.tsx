import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Zephyr",
  description: "Zephyr - the best app!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
