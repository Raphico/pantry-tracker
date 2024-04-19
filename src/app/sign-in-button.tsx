import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", {
          redirectTo: "/dashboard",
        })
      }}
    >
      <Button type="submit" size="sm">
        Sign In
      </Button>
    </form>
  )
}
