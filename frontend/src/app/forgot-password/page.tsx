"use client";

import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { Loader2, Brain, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/auth/forgot-password", { email });
      setIsSubmitted(true);
      toast.success("Reset link sent!", {
        description: "Check your email for instructions."
      });
    } catch (error: any) {
      toast.error("Something went wrong", {
        description: error.response?.data?.error || "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#0b0c10] p-4 select-none overflow-hidden">
      <Toaster position="top-center" theme="dark" richColors />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(109,40,217,0.08)_0%,_#090a0f_100%)] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[440px] backdrop-blur-xl bg-[#131418]/90 border border-white/5 rounded-2xl p-10 shadow-2xl flex flex-col">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/login" className="inline-flex flex-col items-center mb-2 group">
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20 select-none group-hover:scale-105 transition-transform">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white antialiased group-hover:text-violet-400 transition-colors">PathAI</h1>
          </Link>
          <h2 className="text-xl font-bold text-white mt-4">Forgot Password?</h2>
          <p className="text-[14px] font-medium text-zinc-400 mt-2">Enter your email and we&apos;ll send you a link to reset your password.</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mnmrukshan22@gmail.com"
                className="w-full h-[48px] px-4 bg-white/[0.05] border border-white/10 rounded-xl text-[14px] text-white placeholder-white/30 outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:shadow-[0_0_15px_rgba(109,40,217,0.3)] transition-all focus:bg-white/[0.08] backdrop-blur-md"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ background: "linear-gradient(135deg, #6d28d9, #1d4ed8)" }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 hover:brightness-110 active:brightness-95 transition-all text-[15px] text-white font-semibold rounded-xl select-none text-center cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
            </button>

            <Link href="/login" className="inline-flex items-center justify-center w-full gap-2 text-zinc-400 hover:text-white transition-colors text-[13px] font-medium">
              <ArrowLeft size={14} /> Back to Sign in
            </Link>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
              <p className="text-green-400 text-[14px]">If an account exists with that email, a reset link has been sent.</p>
            </div>
            <Link href="/login" className="inline-flex items-center justify-center w-full gap-2 text-zinc-400 hover:text-white transition-colors text-[13px] font-medium">
              <ArrowLeft size={14} /> Back to Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
