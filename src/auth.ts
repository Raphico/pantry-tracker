import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
})
