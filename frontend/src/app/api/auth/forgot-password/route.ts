import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("pathai_db");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      // For security reasons, don't reveal if user exists
      return NextResponse.json({ message: "If an account exists with this email, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { resetToken, resetTokenExpiry } }
    );

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset Request - PathAI",
      html: `
        <div style="font-family: sans-serif; background-color: #090a0f; color: #fff; padding: 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #6d28d9, #1d4ed8); border-radius: 12px; line-height: 48px; font-size: 24px; font-weight: bold;">P</div>
            <h1 style="color: #fff; margin-top: 15px;">PathAI</h1>
          </div>
          <h2 style="color: #fff; font-size: 20px; margin-bottom: 20px;">Password Reset Request</h2>
          <p style="color: #a1a1aa; line-height: 1.6;">You requested a password reset for your PathAI account. Click the button below to set a new password. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin: 40px 0;">
            <a href="${resetUrl}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #6d28d9, #1d4ed8); color: #fff; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(109, 40, 217, 0.3);">Reset Password</a>
          </div>
          <p style="color: #71717a; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;">
          <p style="color: #52525b; font-size: 12px; text-align: center;">&copy; 2024 PathAI. All rights reserved.</p>
        </div>
      `,
    };

    // Log for testing
    console.log("Reset URL:", resetUrl);
    
    try {
        if (process.env.EMAIL_SERVER_USER) {
            await transporter.sendMail(mailOptions);
        }
    } catch (emailError) {
        console.error("Email sending failed:", emailError);
    }

    return NextResponse.json({ message: "If an account exists with this email, a reset link has been sent." });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
