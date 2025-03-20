import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BsCalendar2Check, BsArrowClockwise, BsArrowLeft, BsArrowRight, BsTag } from "react-icons/bs"
import { getBlogPost, getBlogPosts } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { Author } from "@/components/author"
import { BlogCard } from "@/components/blog-card"
import { RelatedPostCard } from "@/components/related-post-card"
import { Suspense } from "react"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.id)

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.coverImage.url }],
      },
    }
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Blog post not found",
    }
  }
}

// 関連記事コンポーネント
async function RelatedPosts({ postId, relatedPosts }: { postId: string; relatedPosts: any[] }) {
  if (!relatedPosts || relatedPosts.length === 0) return null

  return (
    <section
      className="mt-12 sm:mt-16 pt-8 border-t dark:border-primary/30 border-primary/20 max-w-[1024px] mx-auto"
      aria-labelledby="related-posts-heading"
    >
      <h2 id="related-posts-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        Related Posts
      </h2>
      <div className="flex flex-col gap-4">
        {relatedPosts.map((relatedPost) => (
          <RelatedPostCard key={relatedPost.id} post={relatedPost} />
        ))}
      </div>
    </section>
  )
}

// 前後の記事コンポーネント
async function PrevNextPosts({ postId }: { postId: string }) {
  let prevPost = null
  let nextPost = null

  try {
    const { contents: allPosts } = await getBlogPosts({ limit: 100 })
    const currentIndex = allPosts.findIndex((p) => p.id === postId)

    // 時系列的に前の記事（より古い記事）
    prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

    // 時系列的に次の記事（より新しい記事）
    nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  } catch (error) {
    console.error("Error fetching related posts:", error)
    // 前後の記事がなくても続行
  }

  return (
    <nav
      className="mt-12 sm:mt-16 pt-8 border-t dark:border-primary/30 border-primary/20 max-w-[1024px] mx-auto"
      aria-labelledby="pagination-heading"
    >
      <h2 id="pagination-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        Continue Reading
      </h2>
      <div className="flex justify-between">
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-medium mb-3 flex gap-2 items-center text-primary">
            <BsArrowLeft className="h-4 w-4" aria-hidden="true" />
            Previous Article
          </h3>
        </div>
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-medium mb-3 flex gap-2 items-center justify-end text-primary">
            Next Article
            <BsArrowRight className="h-4 w-4" aria-hidden="true" />
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prevPost ? (
          <div className="md:col-start-1">
            <BlogCard post={prevPost} />
          </div>
        ) : (
          <div className="md:col-start-1">
            <p className="text-muted-foreground text-center py-8">No previous articles</p>
          </div>
        )}

        {nextPost ? (
          <div className="md:col-start-2">
            <BlogCard post={nextPost} />
          </div>
        ) : (
          <div className="md:col-start-2">
            <p className="text-muted-foreground text-center py-8">No newer articles</p>
          </div>
        )}
      </div>
    </nav>
  )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.id)

    return (
      <>
        <section className="w-full pt-32 pb-12 md:pt-40 md:pb-16 diagonal-background">
          <div className="container px-4 md:px-6 max-w-[1280px] mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="mb-10 max-w-[360px] mx-auto">
                <Image
                  src={post.coverImage?.url || "/placeholder.svg"}
                  alt={`Cover image for ${post.title}`}
                  width={1200}
                  height={630}
                  className="rounded-lg object-cover aspect-[1200/630] w-full shadow-md"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{post.title}</h1>
              <div className="flex flex-wrap justify-center gap-4 mb-4 mt-4" aria-label="Tags">
                {post.tags?.map((tag) => (
                  <Link
                    href={`/blog?tag=${tag.id}`}
                    key={tag.id}
                    className="tag-text bg-primary/10 text-primary hover:bg-primary/20 px-2 py-1 rounded-full transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={`View all posts with tag: ${tag.name}`}
                  >
                    <BsTag className="h-3 w-3" aria-hidden="true" />
                    {tag.name}
                  </Link>
                ))}
              </div>
              <div className="flex gap-8 items-center justify-center">
                {post.author && (
                  <div className="flex justify-center mt-2">
                    <Author author={post.author} size="lg" />
                  </div>
                )}
                <div className="flex flex-col gap-2 text-sm sm:text-base text-foreground/75">
                  <div className="flex items-center gap-1">
                    <BsCalendar2Check className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.publishedAt} aria-label={`Published on ${formatDate(post.publishedAt)}`}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <BsArrowClockwise className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.updatedAt} aria-label={`Updated on ${formatDate(post.updatedAt)}`}>
                      {formatDate(post.updatedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <article className="container py-8 sm:py-10 md:py-12 max-w-[1024px] mx-auto">
          <div
            className="prose prose-gray dark:prose-invert max-w-[800px] mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 関連記事と前後の記事を並列で取得 */}
          <Suspense fallback={<div className="py-8 text-center">Loading related posts...</div>}>
            {post.relatedPosts && <RelatedPosts postId={params.id} relatedPosts={post.relatedPosts} />}
          </Suspense>

          <Suspense fallback={<div className="py-8 text-center">Loading navigation...</div>}>
            <PrevNextPosts postId={params.id} />
          </Suspense>
        </article>
      </>
    )
  } catch (error) {
    console.error("Error fetching blog post:", error)
    notFound()
  }
}

