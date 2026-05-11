import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("pathai_db")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "User created", userId: result.insertedId }, { status: 201 })
  } catch (error: any) {
    console.error("Signup error details:", error)
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error.message || "Unknown error" 
    }, { status: 500 })
  }
}
