"use client"

import { useEffect, useState, useRef } from "react"
import { Loader2 } from "lucide-react"
import PostCard from "./post-card"
import type { Post } from "@/types/post"
import { getMockPosts } from "@/lib/mock-data"

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const initialLoadDone = useRef(false)

  // Initial load - only load 2 posts initially
  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        const initialPosts = await getMockPosts(1, 2) // Only load 2 posts initially
        setPosts(initialPosts)
        setHasMore(true)

        // Immediately trigger loading more posts after initial render
        initialLoadDone.current = true
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialPosts()
  }, [])

  // Automatically load more posts after initial render
  useEffect(() => {
    if (!loading && initialLoadDone.current && !loadingMore) {
      loadMorePosts()
      initialLoadDone.current = false // Prevent multiple auto-loads
    }
  }, [loading])

  // Load more posts when scrolling to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (loading || loadingMore || !hasMore) return

      const scrollPosition = window.innerHeight + window.scrollY
      const bodyHeight = document.body.offsetHeight

      // If scrolled to bottom (with a 200px threshold)
      if (bodyHeight - scrollPosition < 200) {
        loadMorePosts()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, loadingMore, hasMore, page])

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)
    try {
      const nextPage = page + 1
      // In a real app, this would be an API call
      const newPosts = await getMockPosts(nextPage, 5) // Load 5 posts at a time when scrolling

      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts])
        setPage(nextPage)
        setHasMore(newPosts.length === 5)
      }
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    )
  }

  return (
    <div className="divide-y">
      {posts.length === 0 ? (
        <div className="py-10 text-center text-gray-500">まだ投稿がありません。</div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {loadingMore && (
            <div className="py-5 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <div className="py-5 text-center text-gray-500">これ以上の投稿はありません。</div>
          )}
        </>
      )}
    </div>
  )
}

