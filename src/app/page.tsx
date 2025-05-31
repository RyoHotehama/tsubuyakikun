"use client"

import PostFeed from "@/components/post-feed"
import Tabs from "@/components/tabs"
import { useState } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)

  const tabContents = [
    <PostFeed />,
    <PostFeed />
  ]

  return (
    <div className="container mx-auto px-4">
      {/* タブ切り替え */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* タブの下に余白を確保 */}
      <div className="mt-20">{tabContents[activeTab]}</div>
    </div>
  )
}
