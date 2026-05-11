"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Loader2, Brain, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import axios from "axios";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid link", {
        description: "No reset token found. Please request a new link."
      });
      router.push("/forgot-password");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password too short", {
        description: "Must be at least 6 characters."
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("/api/auth/reset-password", { token, password });
      setIsSuccess(true);
      toast.success("Password updated!", {
        description: "You can now sign in with your new password."
      });
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: any) {
      toast.error("Reset failed", {
        description: error.response?.data?.error || "Please request a new link."
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
          <Link href="/" className="inline-flex flex-col items-center mb-2 group">
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20 select-none group-hover:scale-105 transition-transform">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white antialiased group-hover:text-violet-400 transition-colors">PathAI</h1>
          </Link>
          <h2 className="text-xl font-bold text-white mt-4">Reset Password</h2>
          <p className="text-[14px] font-medium text-zinc-400 mt-2">Enter your new secure password below.</p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">New Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[48px] px-4 pr-12 bg-white/[0.05] border border-white/10 rounded-xl text-[14px] text-white placeholder-white/30 outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:shadow-[0_0_15px_rgba(109,40,217,0.3)] transition-all focus:bg-white/[0.08] backdrop-blur-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[48px] px-4 bg-white/[0.05] border border-white/10 rounded-xl text-[14px] text-white placeholder-white/30 outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] focus:shadow-[0_0_15px_rgba(109,40,217,0.3)] transition-all focus:bg-white/[0.08] backdrop-blur-md"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !token}
              style={{ background: "linear-gradient(135deg, #6d28d9, #1d4ed8)" }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 hover:brightness-110 active:brightness-95 transition-all text-[15px] text-white font-semibold rounded-xl select-none text-center cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center justify-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle2 className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-white font-bold">Success!</h3>
              <p className="text-green-400/80 text-[14px] mt-2 text-center">Your password has been reset. Redirecting to login...</p>
            </div>
            <Link href="/login" className="inline-flex items-center justify-center w-full gap-2 text-white bg-white/5 py-3 rounded-xl hover:bg-white/10 transition-colors text-[14px] font-semibold">
              Go to Login now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
