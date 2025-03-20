import { Suspense } from "react"
import { SearchForm } from "@/components/search-form"
import { TagFilter } from "@/components/tag-filter"
import { BlogCard } from "@/components/blog-card"
import { Pagination } from "@/components/pagination"
import { getBlogPosts, getTags } from "@/lib/api"

interface BlogPageProps {
  searchParams: {
    page?: string
    tag?: string
    q?: string
  }
}

// SearchFormをラップするクライアントコンポーネント
function SearchFormWrapper() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchForm />
    </Suspense>
  )
}

// ブログ記事リストコンポーネント
async function BlogPostsList({ searchParams }: { searchParams: BlogPageProps["searchParams"] }) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const limit = 10
  const offset = (page - 1) * limit

  // Build filters
  const filters: string[] = []
  if (searchParams.tag) {
    filters.push(`tags[contains]${searchParams.tag}`)
  }

  const { contents: posts, totalCount } = await getBlogPosts({
    offset,
    limit,
    filters: filters.length > 0 ? filters.join("[and]") : undefined,
    q: searchParams.q,
  })

  const totalPages = Math.ceil(totalCount / limit)

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 sm:py-12 border border-border/20 rounded-lg">
        <h3 className="text-xl sm:text-2xl font-medium">No posts found</h3>
        <p className="text-base sm:text-lg text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} priority={index < 4} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
          <Suspense fallback={<div className="text-center">Loading pagination...</div>}>
            <Pagination totalPages={totalPages} currentPage={page} />
          </Suspense>
        </div>
      )}
    </>
  )
}

// タグリストコンポーネント
async function TagsList() {
  const { contents: tags } = await getTags()
  return <TagFilter tags={tags} />
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <>
      <section className="w-full pt-32 pb-12 md:pt-40 md:pb-16 diagonal-background">
        <div className="container px-4 md:px-6 max-w-[1280px] mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Blog</h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80">
              Explore our collection of articles, tutorials, and insights
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 sm:py-10 md:py-12 max-w-[1024px] mx-auto">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[240px_1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-4">Search</h2>
              <SearchFormWrapper />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-4">Tags</h2>
              <Suspense fallback={<div>Loading tags...</div>}>
                <TagsList />
              </Suspense>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-10">
            <Suspense fallback={<div className="py-10 text-center">Loading posts...</div>}>
              <BlogPostsList searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
