import type { Post } from "@/types/post"

// Generate a random date within the last 30 days
function getRandomDate() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  return new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())).toISOString()
}

// Generate random content
function getRandomContent() {
  const phrases = [
    "今日は天気がいいですね。散歩に行きたい気分です。",
    "新しいカフェを見つけました。コーヒーがとても美味しかったです！",
    "最近読んだ本がとても面白かった。おすすめです。",
    "今週末は友達と映画を見に行く予定。楽しみ！",
    "新しいプロジェクトが始まりました。頑張ります！",
    "今日の夕食は何にしようかな。レシピを探し中。",
    "朝のジョギングが日課になってきました。健康的な生活を目指しています。",
    "昨日買ったガジェットが思ったより便利で驚いています。",
    "週末は実家に帰省する予定です。久しぶりに家族に会えるのが楽しみ。",
    "今日のミーティングは予想より早く終わりました。ラッキー！",
  ]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

// Generate random number of images (0-3)
function getRandomImages() {
  const count = Math.floor(Math.random() * 4) // 0-3 images
  const images = []

  for (let i = 0; i < count; i++) {
    // Generate random dimensions for the placeholder
    const width = 400 + Math.floor(Math.random() * 200)
    const height = 400 + Math.floor(Math.random() * 200)
    images.push(`/placeholder.svg?height=${height}&width=${width}`)
  }

  return images
}

// Mock function to get posts with pagination
export async function getMockPosts(page: number, limit: number): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // For demo purposes, we'll generate 200 posts total
  const totalPosts = 200
  const startIndex = (page - 1) * limit

  // If we've reached the end of our mock data, return empty array
  if (startIndex >= totalPosts) {
    return []
  }

  // Calculate how many posts to return for this page
  const postsToReturn = Math.min(limit, totalPosts - startIndex)

  const posts: Post[] = []

  for (let i = 0; i < postsToReturn; i++) {
    const postId = startIndex + i + 1
    posts.push({
      id: `post-${postId}`,
      content: `投稿 #${postId}: ${getRandomContent()}`,
      images: getRandomImages(),
      createdAt: getRandomDate(),
      userId: "user-1",
      userName: "ユーザー名",
      userAvatar: "/placeholder.svg?height=48&width=48",
    })
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

