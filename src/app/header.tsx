import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          Pantry Tracker
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button size="sm">Sign in</Button>
        </div>
      </div>
    </header>
  )
}
