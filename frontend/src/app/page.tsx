"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bell, 
  User, 
  Play, 
  Sparkles, 
  Route, 
  FileText, 
  MessageSquare, 
  BarChart, 
  BrainCircuit,
  ArrowRight,
  Globe,
  Link as LinkIcon,
  Mail
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060608] text-white font-sans overflow-x-hidden pb-16 select-none selection:bg-purple-500/30 selection:text-white">
      {/* Dynamic Wave-like Neon Glow Background */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden select-none z-0">
        <div 
          style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(147, 51, 234, 0.15) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%)" }}
          className="w-full h-full"
        />
        <div 
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.08), transparent 40%)" }}
          className="absolute inset-0"
        />
      </div>

      {/* TOP NAV BAR */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-white/5 bg-[#060608]/40 backdrop-blur-md">
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-all">
            <BrainCircuit className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-extrabold tracking-wide text-white group-hover:text-purple-400 transition-colors">PathAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
        </div>

        {/* Action Buttons & Utilities */}
        <div className="flex items-center gap-6">
          <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors duration-200 cursor-pointer">
            <Bell className="w-4.5 h-4.5 text-gray-400 hover:text-white transition-colors" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-purple-500" />
          </button>
          
          <Link href="/dashboard/settings" className="p-2 rounded-full hover:bg-white/5 transition-colors duration-200">
            <User className="w-4.5 h-4.5 text-gray-400 hover:text-white transition-colors" />
          </Link>

          <Link
            href="/login"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold tracking-wide text-white rounded-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:brightness-110 transition-all duration-200 select-none cursor-pointer"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20 text-center space-y-8">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-[10px] font-bold tracking-widest text-cyan-300 backdrop-blur-md select-none mx-auto hover:bg-cyan-500/10 transition-colors select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          PATHAI ENGINE V2.0 LIVE
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.15] text-white">
            Build Your Career Path<br />
            <span style={{ background: "linear-gradient(135deg, #a855f7, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              with Surgical Precision
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Roadmap architecting, career overview, and interview coaching to accelerate your career growth. Stop guessing, start executing.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 select-none"
        >
          <Link 
            href="/signup" 
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 0 25px rgba(124,58,237,0.3)" }}
            className="w-full sm:w-auto px-7 py-3.5 text-white font-bold text-sm rounded-xl tracking-wide hover:brightness-110 active:scale-[0.98] transition-all duration-200 select-none cursor-pointer flex items-center justify-center"
          >
            Get Started Free
          </Link>
          <button className="w-full sm:w-auto px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium text-sm rounded-xl tracking-wide flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all duration-200 select-none cursor-pointer">
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
            </div>
            View Demo
          </button>
        </motion.div>
      </section>

      {/* FEATURE SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Intelligent Roadmap Generation - Wide (span 7) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 p-8 bg-[#101015]/60 border border-white/5 hover:border-purple-500/30 rounded-2xl backdrop-blur-sm flex flex-col justify-between space-y-12 transition-all duration-300 group hover:shadow-[0_0_40px_rgba(124,58,237,0.06)] cursor-pointer"
        >
          <div className="space-y-4">
            <div className="w-11 h-11 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Route className="w-5.5 h-5.5 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
              Roadmap Architect
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              A consolidated intelligence engine that bridges your career gaps. By analyzing your PDF CV or manual profile entry, it identifies critical skill gaps and architecturally designs a personalized 12-week strategic roadmap to reach your target career goal.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Resume Optimization - (span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-5 p-8 bg-[#101015]/60 border border-white/5 hover:border-cyan-500/30 rounded-2xl backdrop-blur-sm flex flex-col justify-between space-y-12 transition-all duration-300 group hover:shadow-[0_0_40px_rgba(6,182,212,0.06)] cursor-pointer"
        >
          <div className="space-y-4">
            <div className="w-11 h-11 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5.5 h-5.5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Career Overview
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Monitor your growth, track saved roadmaps, and analyze your industry readiness through a unified progress dashboard acting as a career cockpit.
            </p>
          </div>
        </motion.div>

        {/* Card 3: Mock Interviews - (span 4) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 p-8 bg-[#101015]/60 border border-white/5 hover:border-indigo-500/30 rounded-2xl backdrop-blur-sm flex flex-col justify-between space-y-12 transition-all duration-300 group hover:shadow-[0_0_40px_rgba(99,102,241,0.06)] cursor-pointer"
        >
          <div className="space-y-4">
            <div className="w-11 h-11 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <MessageSquare className="w-5.5 h-5.5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Interview Coach
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Practice with a real-time, interactive AI coach that provides instant feedback to sharpen your technical responses and behavioral readiness.
            </p>
          </div>
        </motion.div>

        {/* Card 4: Continuous Trajectory Analytics - Wide (span 8) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-8 p-8 bg-[#101015]/60 border border-white/5 hover:border-emerald-500/30 rounded-2xl backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300 group hover:shadow-[0_0_40px_rgba(16,185,129,0.06)] cursor-pointer"
        >
          <div className="space-y-4 flex-1">
            <div className="w-11 h-11 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <BarChart className="w-5.5 h-5.5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Career Analytics
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Monitor your career growth and industry readiness through a visual dashboard that tracks your skill progression and market value in real-time.
            </p>
          </div>

          {/* Skeleton Chart Graphic EXACTLY matching the second mockup */}
          <div className="flex items-end gap-3 h-32 bg-[#121217] border border-white/5 p-4 rounded-xl select-none min-w-[200px]">
            <div className="w-10 h-1/4 bg-white/5 rounded-md border-t border-cyan-400/30 group-hover:scale-y-105 transition-transform duration-300" />
            <div className="w-10 h-2/4 bg-white/5 rounded-md border-t border-cyan-400/40 group-hover:scale-y-105 transition-transform duration-300" />
            <div className="w-10 h-3/4 bg-white/5 rounded-md border-t border-cyan-400/60 group-hover:scale-y-105 transition-transform duration-300" />
            <div 
              style={{ background: "linear-gradient(180deg, rgba(34,211,238,0.25), rgba(34,211,238,0.05))" }}
              className="w-10 h-full rounded-md border-t border-cyan-400 group-hover:scale-y-105 transition-transform duration-300" 
            />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
      {/* FOOTER */}
      {/* FOOTER */}
      <footer className="relative z-10 bg-[#060608] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <BrainCircuit className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform" />
                <span className="text-xl font-black tracking-tighter text-white group-hover:text-purple-400 transition-colors uppercase">PATHAI</span>
              </Link>
              <p className="text-[12px] text-white/30 font-medium tracking-wide">
                Empowering the future of work through surgical AI precision.
              </p>
            </div>

            {/* Social Links Section */}
            <div className="flex flex-col items-center md:items-end gap-3">
               <h4 className="text-[9px] font-black text-white uppercase tracking-[0.3em] opacity-50">Connect</h4>
               <div className="flex items-center gap-5">
                  <Link href="#" className="text-white/30 hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </Link>
                  <Link href="#" className="text-white/30 hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </Link>
                  <Link href="#" className="text-white/30 hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
                  </Link>
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">
              © 2026 PathAI. All rights reserved.
            </span>
            
            <div className="flex items-center gap-8 text-[10px] font-bold text-white/30 tracking-widest uppercase">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">API</Link>
              <Link href="#" className="hover:text-white transition-colors">Careers</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
