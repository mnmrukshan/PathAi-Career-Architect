"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Rocket, Target, ShieldCheck, Sparkles } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  roadmapData: any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, roadmapData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Strategic Sidebar */}
      <div className="lg:col-span-4 space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8 space-y-8 sticky top-32 border-violet-500/10 shadow-2xl"
        >
          <div className="pb-6 border-b border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white shadow-lg shadow-violet-500/20">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Target Objective</h4>
                <p className="text-xl font-bold text-white">{roadmapData.target_role}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h5 className="text-xs font-black text-violet-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Skill Gap Analysis
              </h5>
              <div className="flex flex-wrap gap-2">
                {roadmapData.skill_gap.map((skill: string) => (
                  <span 
                    key={skill} 
                    className="px-4 py-1.5 rounded-xl bg-violet-500/5 border border-violet-500/20 text-xs font-semibold text-violet-300 hover:bg-violet-500/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-tr from-violet-600/10 to-transparent rounded-2xl border border-violet-500/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Target className="w-24 h-24 text-white" />
              </div>
              <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                Mentor Intelligence
              </h5>
              <p className="text-sm text-gray-400 leading-relaxed">
                "We've identified {roadmapData.skill_gap.length} critical gaps. This roadmap is architected to bridge them using a modular learning approach."
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex gap-4">
             <div className="flex-1 text-center">
                <p className="text-[10px] font-black text-gray-600 uppercase">Duration</p>
                <p className="text-2xl font-black text-white">{roadmapData.roadmap.length} <span className="text-xs text-gray-500">wks</span></p>
             </div>
             <div className="w-px bg-white/5" />
             <div className="flex-1 text-center">
                <p className="text-[10px] font-black text-gray-600 uppercase">Complexity</p>
                <p className="text-2xl font-black text-pink-500">High</p>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Main Roadmap Area */}
      <div className="lg:col-span-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
