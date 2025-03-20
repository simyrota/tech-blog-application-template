"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormState("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setFormState("error")
    }
  }

  return (
    <>
      <section className="w-full pt-32 pb-12 md:pt-40 md:pb-16 diagonal-background">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Contact</h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 sm:py-10 md:py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl text-foreground">Get in Touch</CardTitle>
              <CardDescription className="text-sm sm:text-base text-foreground/70">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 bg-card">
              {formState === "success" && (
                <Alert
                  className="mb-6 border-green-500 text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  <AlertTitle className="text-base sm:text-lg">Success!</AlertTitle>
                  <AlertDescription className="text-sm sm:text-base">
                    Your message has been sent successfully. We'll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}

              {formState === "error" && (
                <Alert
                  className="mb-6 border-red-500 text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <AlertTitle className="text-base sm:text-lg">Error</AlertTitle>
                  <AlertDescription className="text-sm sm:text-base">
                    There was an error sending your message. Please try again later.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                <div className="space-y-2">
                  <Label htmlFor="name" className="form-label text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input bg-background border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                    aria-required="true"
                    aria-invalid={formData.name === ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="form-label text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input bg-background border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                    aria-required="true"
                    aria-invalid={formData.email === ""}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="form-label text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input bg-background border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                    aria-required="true"
                    aria-invalid={formData.subject === ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="form-label text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input bg-background border-primary/20 focus:border-primary/50 focus:ring-primary/30"
                    aria-required="true"
                    aria-invalid={formData.message === ""}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                disabled={formState === "submitting"}
                className="w-full btn-text focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-busy={formState === "submitting"}
              >
                {formState === "submitting" ? "Sending..." : "Send Message"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

