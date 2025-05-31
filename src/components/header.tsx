"use client"

import Image from "next/image"
import Link from "next/link"
import Tabs from "./tabs"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-sky-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left icon - clickable */}
          <div className="flex items-center">
            <Link
              href="/"
              className="h-8 w-8 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
            >
              <span className="text-white font-bold">A</span>
            </Link>
          </div>

          {/* Center logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={20}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right space (for future elements) */}
          <div className="w-8"></div>
        </div>
      </div>
    </header>
  )
}

