import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise, { databaseName: "pathai_db" }),
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const client = await clientPromise
        const db = client.db("pathai_db")
        const user = await db.collection("users").findOne({ email: credentials.email })

        if (user && user.password) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
            }
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
})
