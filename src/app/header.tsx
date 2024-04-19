import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import { SignOutButton } from "./sign-out-button"
import { SignInButton } from "./sign-in-button"

export async function Header() {
  const session = await auth()

  return (
    <header className="w-full border-b">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          Pantry Tracker
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {session ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </header>
  )
}
