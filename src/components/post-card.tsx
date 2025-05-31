import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import type { Post } from "@/types/post"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="border-b p-4">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={post.userAvatar || "/placeholder.svg"}
            alt={post.userName}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <p className="font-medium text-gray-900">{post.userName}</p>
            <span className="text-sm text-gray-500">・</span>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { locale: ja, addSuffix: true })}
            </p>
          </div>
          <p className="mt-1 text-gray-900 whitespace-pre-wrap break-words">{post.content}</p>

          {post.images.length > 0 && (
            <div className={`mt-3 grid gap-1 ${getGridClass(post.images.length)}`}>
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    post.images.length === 1 ? "aspect-[16/9] max-h-[200px]" : "aspect-square max-h-[120px]"
                  } overflow-hidden rounded-lg`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getGridClass(imageCount: number): string {
  switch (imageCount) {
    case 1:
      return ""
    case 2:
      return "grid-cols-2"
    case 3:
      return "grid-cols-3"
    default:
      return ""
  }
}

