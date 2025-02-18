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
        className="h-screen w-screen bg-blue-950 "
      >
        <main className="h-full w-full ">
        {children}
        </main>
      </body>
    </html>
  );
}
