"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Search, MessageSquare } from "lucide-react"

export default function Footer() {
  const [activeButton, setActiveButton] = useState("home")

  const buttons = [
    { id: "home", label: "トップ", icon: Home, href: "/" },
    { id: "search", label: "検索", icon: Search, href: "/search" },
    { id: "forum", label: "掲示板", icon: MessageSquare, href: "/forum" },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {buttons.map((button) => (
            <Link
              key={button.id}
              href={button.href}
              onClick={() => setActiveButton(button.id)}
              className={`flex flex-col items-center justify-center w-20 py-2 transition-colors ${
                activeButton === button.id ? "text-sky-600" : "text-gray-600 hover:text-sky-600"
              }`}
            >
              <button.icon
                className={`h-6 w-6 mb-1 ${activeButton === button.id ? "text-sky-600" : "text-gray-600"}`}
              />
              <span className="text-xs font-medium">{button.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

