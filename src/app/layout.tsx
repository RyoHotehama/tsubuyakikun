import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "My App",
  description: "App with responsive header, tabs and footer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-[104px] pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

