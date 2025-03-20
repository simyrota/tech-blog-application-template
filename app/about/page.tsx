import Image from "next/image"
import { getAuthors } from "@/lib/api"

export const metadata = {
  title: "About - Tech Blog",
  description: "Learn more about our tech blog and the team behind it",
}

export default async function AboutPage() {
  const { contents: authors } = await getAuthors()

  return (
    <>
      <section className="w-full pt-32 pb-12 md:pt-40 md:pb-16 diagonal-background">
        <div className="container px-4 md:px-6 max-w-[1280px] mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">About</h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80">
              Learn more about our tech blog and the team behind it
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 sm:py-10 md:py-12 max-w-[1024px] mx-auto">
        <div className="grid gap-12 sm:gap-16">
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter mb-6">About the Author</h2>
            <div className="grid gap-8 lg:grid-cols-[200px_1fr] items-start">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto lg:mx-0 shadow-md">
                <Image src="/placeholder.svg?height=160&width=160" alt="Author" fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium">John Doe</h3>
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                  John is a senior software engineer with over 10 years of experience in web development, cloud
                  architecture, and DevOps. He has worked with various technologies including React, Node.js, AWS, and
                  Docker.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                  With a passion for teaching and sharing knowledge, John started this tech blog to help other
                  developers navigate the complex world of modern software development. He believes in practical,
                  hands-on learning and strives to make complex topics accessible to developers at all levels.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                  When not coding or writing, John enjoys hiking, photography, and experimenting with new cooking
                  recipes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter mb-6">Website Concept</h2>
            <div className="space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                This website is built with modern web technologies to provide an optimal reading experience. We've
                designed it with a focus on readability, accessibility, and performance.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                The tech stack includes Next.js for server-side rendering and static site generation, Tailwind CSS for
                styling, and a headless CMS for content management. This combination allows us to deliver fast loading
                times while maintaining flexibility in content creation and design.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                We've implemented features like dark mode support, responsive design for all device sizes, and optimized
                images to ensure a great user experience regardless of how you access our content.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-card/60 border border-primary/20 p-4 sm:p-6 rounded-lg shadow-sm">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium mb-2">Performance First</h3>
                  <p className="text-xs sm:text-sm md:text-base text-foreground/75">
                    Optimized for fast loading times and smooth interactions, even on slower connections.
                  </p>
                </div>
                <div className="bg-card/60 border border-primary/20 p-4 sm:p-6 rounded-lg shadow-sm">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium mb-2">Accessibility</h3>
                  <p className="text-xs sm:text-sm md:text-base text-foreground/75">
                    Designed with accessibility in mind, ensuring content is available to all readers.
                  </p>
                </div>
                <div className="bg-card/60 border border-primary/20 p-4 sm:p-6 rounded-lg shadow-sm">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium mb-2">Modern Design</h3>
                  <p className="text-xs sm:text-sm md:text-base text-foreground/75">
                    Clean, minimalist aesthetic that puts the focus on content while being visually appealing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

