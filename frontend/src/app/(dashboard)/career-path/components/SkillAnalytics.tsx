"use client";

import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { Sparkles, TrendingUp, Zap, Target } from "lucide-react";

interface SkillAnalyticsProps {
  currentSkills: string[];
  targetRole: string;
  skillGaps: string[];
}

export default function SkillAnalytics({ currentSkills, targetRole, skillGaps }: SkillAnalyticsProps) {
  // Mock data for the Radar Chart
  const data = [
    { subject: 'Frontend', A: 85, B: 95 },
    { subject: 'Backend', A: 45, B: 90 },
    { subject: 'Database', A: 60, B: 85 },
    { subject: 'Architecture', A: 30, B: 80 },
    { subject: 'DevOps', A: 40, B: 75 },
    { subject: 'Testing', A: 50, B: 85 },
  ];

  return (
    <div className="space-y-6 sticky top-24">
      {/* Radar Chart Card */}
      <div className="bg-[#131418]/80 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-violet-500/10 rounded-lg">
            <Target className="w-4 h-4 text-violet-400" />
          </div>
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">Skill Map Architecture</h3>
        </div>

        <div className="h-[280px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }}
              />
              <Radar
                name="Current Profile"
                dataKey="A"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.4}
              />
              <Radar
                name="Target Level"
                dataKey="B"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Current Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Target Goal</span>
          </div>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="bg-[#131418]/80 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-[50px] -mr-16 -mt-16 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">AI Insights</h3>
          </div>
          <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">68% Match</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Key Strengths</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentSkills.slice(0, 3).map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-white/[0.03] border border-white/[0.05] rounded-md text-[10px] font-bold text-zinc-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Priority Focus</span>
            </div>
            <p className="text-[12px] font-medium text-white leading-relaxed">
              Master <span className="text-violet-400 font-bold">{skillGaps[0] || "Backend Architecture"}</span> to bridge the largest gap between your current role and {targetRole}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
