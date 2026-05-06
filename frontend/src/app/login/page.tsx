import { signIn } from "@/auth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#0b0c10] p-4 select-none overflow-hidden select-none">
      {/* Subtle radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#121319_0%,_#090a0f_100%)] pointer-events-none" />

      {/* Decorative blurred background circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Auth Card Exactly like the Reference Image */}
      <div className="relative z-10 w-full max-w-[440px] backdrop-blur-xl bg-[#131418]/90 border border-white/5 rounded-2xl p-10 shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-2 select-none">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white antialiased">
              PathAI
            </h1>
          </Link>
          <p className="text-[14px] font-medium text-zinc-400">
            Enter your elite career dashboard.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3.5 mb-6">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1e1f24] hover:bg-[#282a32] text-zinc-200 border border-white/[0.04] hover:border-white/[0.08] transition-all rounded-xl font-medium cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#F5F5F7"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#F5F5F7"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#F5F5F7"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#F5F5F7"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1e1f24] hover:bg-[#282a32] text-zinc-200 border border-white/[0.04] hover:border-white/[0.08] transition-all rounded-xl font-medium cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 text-white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </form>
        </div>

        {/* OR EMAIL divider */}
        <div className="flex items-center gap-4 mb-6 select-none">
          <div className="h-[1px] flex-1 bg-white/[0.06]" />
          <span className="text-[10px] tracking-widest text-zinc-500 font-bold uppercase">
            Or Email
          </span>
          <div className="h-[1px] flex-1 bg-white/[0.06]" />
        </div>

        <form
          action={async (formData) => {
            "use server";
            const email = formData.get("email");
            const password = formData.get("password");
            if (email) {
              await signIn("credentials", { email, password, redirectTo: "/dashboard" });
            }
          }}
        >
          {/* Form Inputs */}
          <div className="space-y-4 mb-6">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2 select-none"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="professional@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 bg-[#191a1e] border border-white/[0.04] rounded-xl text-[14px] text-white placeholder-zinc-600 outline-none focus:border-white/10 transition-all focus:bg-[#1d1e23]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 select-none">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 select-none"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold tracking-wide text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-[#191a1e] border border-white/[0.04] rounded-xl text-[14px] text-white placeholder-zinc-600 outline-none focus:border-white/10 transition-all focus:bg-[#1d1e23]"
              />
            </div>
          </div>

          {/* CTA Button with gradient */}
          <button
            type="submit"
            style={{ background: "linear-gradient(135deg, #6d28d9, #1d4ed8)" }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 hover:brightness-110 active:brightness-95 transition-all text-[15px] text-white font-semibold rounded-xl select-none mb-6 text-center cursor-pointer"
          >
            Access Intelligence
          </button>
        </form>

        {/* Sign up prompt */}
        <div className="text-center text-[13.5px] font-medium text-zinc-400 select-none">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-white font-bold hover:underline transition-all"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
