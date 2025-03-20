import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Author as AuthorType } from "@/types"

interface AuthorProps {
  author: AuthorType
  size?: "sm" | "md" | "lg"
  showName?: boolean
}

export function Author({ author, size = "md", showName = true }: AuthorProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  // 著者情報が存在しない場合
  if (!author) {
    return (
      <div className="flex items-center gap-2" aria-label="Anonymous author">
        <Avatar className={sizeClasses[size]}>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        {showName && <span className="text-sm sm:text-sm md:text-base font-medium">Anonymous</span>}
      </div>
    )
  }

  // 著者名が存在しない場合
  const authorName = author.name || "Anonymous"
  const authorInitial = authorName.charAt(0).toUpperCase()

  return (
    <div className="flex items-center gap-2" aria-label={`Author: ${authorName}`}>
      <Avatar className={sizeClasses[size]}>
        {author.image?.url ? <AvatarImage src={author.image.url} alt="" loading="lazy" /> : null}
        <AvatarFallback>{authorInitial}</AvatarFallback>
      </Avatar>
      {showName && <span className="text-sm sm:text-sm md:text-base font-medium">{authorName}</span>}
    </div>
  )
}

