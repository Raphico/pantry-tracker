import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="container max-w-3xl py-24 md:py-32">
      <div className="flex flex-col w-full space-y-4 items-center justify-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:sm:text-6xl xl:text-7xl">
          Track your Pantry Effortlessly
        </h1>
        <p className="leading-7 max-w-lg text-lg text-muted-foreground">
          Efficiently manage your groceries and pantry items in one place.
          Always know what&apos;s in stock and what needs restocking.
        </p>
        <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
          Get Started
        </Link>
      </div>
    </main>
  )
}
