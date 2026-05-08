import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedPool = nextUrl.pathname.startsWith('/dashboard') || 
                              nextUrl.pathname.startsWith('/resume-builder') ||
                              nextUrl.pathname.startsWith('/interview-coach');
      
      const isAuthRoute = nextUrl.pathname.startsWith('/login') || 
                          nextUrl.pathname.startsWith('/signup');

      if (isProtectedPool) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add empty providers to satisfy NextAuthConfig
} satisfies NextAuthConfig
