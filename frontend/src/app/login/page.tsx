"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Loader2, BrainCircuit, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials", {
            description: "Please check your email and password."
        });
      } else {
        toast.success("Welcome back!", {
            description: "Accessing your elite dashboard..."
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
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

      <div className="relative z-10 w-full max-w-[440px] backdrop-blur-xl bg-[#131418]/90 border border-white/5 rounded-2xl p-10 shadow-2xl flex flex-col justify-between">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="inline-flex flex-col items-center mb-2 group">
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20 select-none group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white antialiased group-hover:text-violet-400 transition-colors">PathAI</h1>
          </Link>
          <p className="text-[14px] font-medium text-zinc-400">Unlock your AI-driven career potential.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Password</label>
                <Link href="/forgot-password" className="text-[11px] font-semibold tracking-wide text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</Link>
              </div>
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
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ background: "linear-gradient(135deg, #6d28d9, #1d4ed8)" }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 hover:brightness-110 active:brightness-95 transition-all text-[15px] text-white font-semibold rounded-xl select-none mb-6 text-center cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enter Platform"}
          </button>
        </form>

        <div className="text-center text-[13.5px] font-medium text-zinc-400 select-none">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-white font-bold hover:text-purple-400 transition-colors hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
