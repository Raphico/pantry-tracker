import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl))
  }
})

export const config = {
  matcher: ["/dashboard/:path"],
}
