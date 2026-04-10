"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, ChevronRight, Sparkles } from "lucide-react";

interface RoleSelectorProps {
  onSelect: (role: string) => void;
  loading?: boolean;
}

const SUGGESTIONS = [
  "Senior Fullstack Developer",
  "AI/ML Engineer",
  "DevOps Architect",
  "Cybersecurity Analyst",
  "Cloud Solutions Architect",
  "Data Scientist"
];

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect, loading }) => {
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role.trim()) {
      onSelect(role.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 md:p-12 space-y-10"
      >
        <div className="text-center space-y-4">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-flex p-4 rounded-3xl bg-violet-500/10 text-violet-400 mb-2 border border-violet-500/20"
          >
            <Target className="w-8 h-8" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white tracking-tight">
            What's your dream <span className="text-gradient">Career Goal?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">Tell us where you want to go, and we'll architect the perfect bridge.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Backend Engineer"
              className="relative w-full bg-black/60 border border-white/10 rounded-2xl px-8 py-5 text-xl focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-gray-600"
              autoFocus
            />
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              Popular Paths
            </p>
            <div className="flex flex-wrap gap-3">
              {SUGGESTIONS.map((suggestion) => (
                <motion.button
                  key={suggestion}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRole(suggestion)}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300
                    ${role === suggestion 
                      ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/30" 
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-violet-500/30 hover:text-white"}
                  `}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!role.trim() || loading}
            className="btn-primary w-full py-4 text-xl gap-3"
          >
            <span>{loading ? "Designing Your Path..." : "Build My Roadmap"}</span>
            {!loading && <ChevronRight className="w-6 h-6" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RoleSelector;
