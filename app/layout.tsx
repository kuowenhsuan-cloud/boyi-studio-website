import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** 先用最簡單、不會出紅字的版本 **/
export const metadata: Metadata = {
    metadataBase: new URL("https://www.brad-studio.com"),
  title: "柏宜山房 Brad Studio｜台北中國書畫裝裱與修復",
  description:
    "柏宜山房 Brad Studio 位於台北松山區，專業提供中國書畫裝裱、書畫修復、框裱設計與保存建議，採用可逆性材料與收藏級工藝。",
  keywords: [
    "柏宜山房",
    "Brad Studio",
    "書畫裝裱",
    "書畫修復",
    "中國書畫裝裱",
    "台北 裝裱",
    "台北 書畫修復",
    "松山區 裝裱工作室",
  ],
  openGraph: {
    title: "柏宜山房 Brad Studio｜台北中國書畫裝裱與修復",
    description:
      "位於台北松山區的中國書畫裝裱與修復工作室，提供立軸、手卷、冊頁、框裱與紙本修復服務，採用可逆性材料與收藏級工藝。",
    url: "/",
    siteName: "柏宜山房 Brad Studio",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/og-brad.jpg", // 你之後放一張 1200x630 的工作室照片到 public
        width: 1200,
        height: 630,
        alt: "柏宜山房 Brad Studio 工作現場",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "柏宜山房 Brad Studio｜台北中國書畫裝裱與修復",
    description:
      "柏宜山房 Brad Studio 專業提供中國書畫裝裱與修復，採用可逆性與保存級材料，位於台北松山區。",
    images: ["/og-brad.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}