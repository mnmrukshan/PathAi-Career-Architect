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
  ArrowRight
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
          
          <Link href="/get-started" className="p-2 rounded-full hover:bg-white/5 transition-colors duration-200">
            <User className="w-4.5 h-4.5 text-gray-400 hover:text-white transition-colors" />
          </Link>

          <Link
            href="/dashboard"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold tracking-wide text-white rounded-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:brightness-110 transition-all duration-200 select-none cursor-pointer"
          >
            Go to Dashboard
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
          Intelligent roadmap generation, resume optimization, and mock interviews to accelerate your career growth. Stop guessing, start executing.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 select-none"
        >
          <Link 
            href="/get-started" 
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
              Intelligent Roadmap Generation
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
              Our AI analyzes millions of career trajectories to map out the precise skills, roles, and milestones you need to reach your ultimate destination.
            </p>
          </div>
          {/* Tags */}
          <div className="flex items-center gap-2 pt-2 text-xs select-none">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400">Data Science</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400">Machine Learning</span>
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
              Resume Optimization
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Surgically align your experience with target roles. The AI parses job descriptions and refines your bullet points for maximum impact and ATS pass-through.
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
              Mock Interviews
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Practice with an AI trained on real technical and behavioral questions from top-tier companies. Receive instant, actionable feedback.
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
              Continuous Trajectory Analytics
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Monitor your market value, skill gaps, and industry demand in real-time. The dashboard acts as a cockpit for your career progression.
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
      <footer className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 select-none mt-12">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 select-none hover:opacity-80 transition-opacity group">
            <span className="text-sm font-bold tracking-wide uppercase text-white select-none group-hover:text-purple-400 transition-colors">PathAI</span>
          </Link>
          <span className="text-xs text-gray-600 font-medium tracking-wide">
            © 2024 PathAI. Surgical Precision in Career Growth.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-500 select-none">
          <Link href="/get-started" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/get-started" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/get-started" className="hover:text-white transition-colors">API</Link>
          <Link href="/get-started" className="hover:text-white transition-colors">Careers</Link>
        </div>
      </footer>
    </div>
  );
}
