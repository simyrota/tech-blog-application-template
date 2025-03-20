"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      const params = new URLSearchParams(searchParams.toString())

      if (query) {
        params.set("q", query)
      } else {
        params.delete("q")
      }

      router.push(`/blog?${params.toString()}`)
    },
    [query, router, searchParams],
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2"
      role="search"
      aria-label="Search articles"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/70" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={handleChange}
          className="pl-8 bg-background border-primary/20 focus:border-primary/50 focus:ring-primary/30 form-input"
          aria-label="Search articles"
        />
      </div>
      <Button type="submit" size="sm" className="shrink-0 btn-text">
        Search
      </Button>
    </form>
  )
}

