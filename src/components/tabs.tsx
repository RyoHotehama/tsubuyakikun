"use client"

export default function Tabs({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (index: number) => void }) {
  const tabs = ["みんなの投稿", "自身の投稿"]

  return (
    <div className="w-full bg-white border-b fixed top-16 left-0 right-0 z-40 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {tabs.map((name, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-3 px-4 text-sm font-medium transition-colors relative ${
                activeTab === index ? "text-sky-600" : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
              }`}
            >
              {name}
              {activeTab === index && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500"></div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
