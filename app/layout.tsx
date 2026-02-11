import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Doctor AI | Your Personal Health Assistant",
  description: "Doctor AI is your personal health assistant, providing accurate medical information and guidance at your fingertips. Whether you have questions about symptoms, medications, or general health advice, Doctor AI is here to help you make informed decisions about your well-being.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
