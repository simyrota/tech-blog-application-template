import { getList, getDetail, getTags as getMicroCMSTags, getAuthors as getMicroCMSAuthors } from "./microcms"
import { adaptBlog, adaptTag } from "./adapters"
import type { BlogPost, Tag, Author } from "@/types"

export interface BlogResponse {
  contents: BlogPost[]
  totalCount: number
  offset: number
  limit: number
}

export interface TagResponse {
  contents: Tag[]
  totalCount: number
  offset: number
  limit: number
}

export interface AuthorResponse {
  contents: Author[]
  totalCount: number
  offset: number
  limit: number
}

/**
 * ブログ記事一覧を取得する
 */
export async function getBlogPosts(
  params: {
    offset?: number
    limit?: number
    filters?: string
    q?: string
  } = {},
): Promise<BlogResponse> {
  try {
    const response = await getList({
      offset: params.offset,
      limit: params.limit,
      filters: params.filters,
      q: params.q,
    })

    return {
      contents: response.contents.map(adaptBlog),
      totalCount: response.totalCount,
      offset: response.offset,
      limit: response.limit,
    }
  } catch (error) {
    console.error("Error in getBlogPosts:", error)
    return { contents: [], totalCount: 0, offset: 0, limit: 10 }
  }
}

/**
 * ブログ記事詳細を取得する
 * depthパラメータを使用して関連コンテンツの詳細も取得する
 */
export async function getBlogPost(id: string): Promise<BlogPost> {
  try {
    // getDetail関数内でdepth=3が設定されるため、関連コンテンツの詳細も取得される
    const blog = await getDetail(id)
    return adaptBlog(blog)
  } catch (error) {
    console.error(`Error in getBlogPost for ${id}:`, error)
    throw error
  }
}

/**
 * タグ一覧を取得する
 */
export async function getTags(): Promise<TagResponse> {
  try {
    const response = await getMicroCMSTags()

    return {
      contents: response.contents.map(adaptTag),
      totalCount: response.totalCount,
      offset: response.offset,
      limit: response.limit,
    }
  } catch (error) {
    console.error("Error in getTags:", error)
    return { contents: [], totalCount: 0, offset: 0, limit: 10 }
  }
}

/**
 * 著者一覧を取得する
 */
export async function getAuthors(): Promise<AuthorResponse> {
  try {
    const response = await getMicroCMSAuthors()

    return {
      contents: response.contents,
      totalCount: response.totalCount,
      offset: response.offset,
      limit: response.limit,
    }
  } catch (error) {
    console.error("Error in getAuthors:", error)
    return { contents: [], totalCount: 0, offset: 0, limit: 10 }
  }
}

