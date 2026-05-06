import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email) {
          return {
            id: "1",
            name: String(credentials.email).split("@")[0],
            email: String(credentials.email),
          }
        }
        return null
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || "d5d34be7e26978df0b4d4554b73b53f0",
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
})
