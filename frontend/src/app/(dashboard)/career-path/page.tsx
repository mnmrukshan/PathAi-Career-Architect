"use client";

import { useState } from "react";
import SkillAnalytics from "./components/SkillAnalytics";

export default function CareerPathPage() {
  const [targetRole, setTargetRole] = useState("Senior Full Stack Engineer");
  const [currentSkills, setCurrentSkills] = useState("React, JavaScript, CSS");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const generateAction = async () => {
    if (!targetRole || !currentSkills) return;
    setLoading(true);
    setRoadmap(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "demo-user-123",
          target_role: targetRole,
          current_skills: currentSkills.split(",").map((s) => s.trim()),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRoadmap(data);
      } else {
        alert("Failed to generate roadmap from the backend.");
      }
    } catch (err) {
      alert("Error generating roadmap. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (index: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={`space-y-10 ${roadmap ? 'max-w-6xl' : 'max-w-4xl'} select-none transition-all duration-500`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Career Path
          </h1>
          <p className="text-[14.5px] font-medium text-zinc-400">
            Design your ideal trajectory using AI.
          </p>
        </div>

        {/* AI STATUS: UPDATING */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0f1c24] border border-cyan-500/20 rounded-xl flex-shrink-0 self-start md:self-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_#22d3ee]" />
          <span className="text-[10px] font-extrabold tracking-widest text-cyan-400 uppercase select-none">
            {loading ? "AI THINKING..." : "AI READY"}
          </span>
        </div>
      </div>

      {/* Input Configuration form */}
      <div className="p-6 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl grid gap-4 md:grid-cols-2 items-end">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-2">
            Target Role
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-4 py-3 bg-[#16171b]/60 border border-white/[0.04] hover:border-white/[0.08] rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition-all focus:bg-[#1a1b20]"
            placeholder="e.g. Lead Developer"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-2">
            Current Skills (Comma separated)
          </label>
          <input
            type="text"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            className="w-full px-4 py-3 bg-[#16171b]/60 border border-white/[0.04] hover:border-white/[0.08] rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition-all focus:bg-[#1a1b20]"
            placeholder="e.g. React, JavaScript"
          />
        </div>

        <div className="md:col-span-2">
          <button
            onClick={generateAction}
            disabled={loading}
            style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)" }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-[13.5px] text-white font-bold rounded-xl hover:brightness-110 active:brightness-95 transition-all shadow-xl shadow-blue-600/10 cursor-pointer disabled:opacity-60 select-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing optimal paths...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Build Career Roadmap
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-zinc-400 text-sm font-medium animate-pulse select-none">
            Processing optimal career trajectory...
          </p>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className={`grid gap-10 ${roadmap ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
        
        {/* Left Side: Skill Analytics (Sticky) */}
        {roadmap && (
          <div className="lg:col-span-4 order-2 lg:order-1">
            <SkillAnalytics 
              currentSkills={currentSkills.split(",").map(s => s.trim())} 
              targetRole={targetRole} 
              skillGaps={roadmap.skill_gap || []} 
            />
          </div>
        )}

        {/* Right Side: Roadmap Timeline */}
        <div className={`${roadmap ? 'lg:col-span-8' : 'col-span-1'} order-1 lg:order-2`}>
          {roadmap && (
            <div className="space-y-6">
              <div className="bg-[#0e0f14]/80 border border-white/[0.03] backdrop-blur-md p-6 rounded-2xl space-y-3.5 select-none hover:border-white/[0.08] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 select-none">
                    Gap Analysis
                  </span>
                  <span className="text-sm font-bold text-cyan-400">
                    Skills identified to learn
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {roadmap.skill_gap?.map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#152329] border border-cyan-400/30 rounded-lg text-xs font-bold text-cyan-300 select-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative border-l border-white/[0.05] ml-5 pl-10 space-y-8 select-none">
                {roadmap.roadmap?.map((weekItem: any, idx: number) => {
                  const isChecked = !!checkedSteps[idx];
                  return (
                    <div key={idx} className="relative flex flex-col gap-2">
                      <button
                        onClick={() => toggleCheck(idx)}
                        className={`absolute -left-[54px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none ${
                          isChecked
                            ? "bg-[#16291a] border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                            : "bg-[#0d1e29] border-cyan-400 text-cyan-400 shadow-[0_0_12px_#22d3ee]"
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div
                        className={`p-6 border rounded-2xl backdrop-blur-xl hover:border-white/[0.08] transition-all flex flex-col justify-between gap-3 ${
                          isChecked
                            ? "bg-[#0d1511]/40 border-emerald-500/10 opacity-70"
                            : "bg-[#0f151c]/90 border-cyan-500/30 shadow-2xl shadow-cyan-500/5 hover:border-cyan-500/50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-lg font-bold leading-tight ${
                              isChecked ? "text-zinc-500 line-through" : "text-white"
                            }`}>
                              Week {weekItem.week}: {weekItem.goal}
                            </h3>
                            <span className={`px-3 py-1 rounded-lg text-[9.5px] font-black tracking-widest uppercase select-none ${
                              isChecked
                                ? "bg-zinc-800 border-zinc-700 text-zinc-500"
                                : "bg-[#122421] border border-cyan-400/30 text-cyan-400"
                            }`}>
                              {isChecked ? "Completed" : "In Progress"}
                            </span>
                          </div>

                          <p className={`text-[13px] max-w-xl font-medium leading-relaxed ${
                            isChecked ? "text-zinc-600" : "text-zinc-400"
                          }`}>
                            <strong>Task:</strong> {weekItem.task}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3 select-none">
                            {weekItem.topics?.map((topic: string, tIdx: number) => (
                              <span
                                key={tIdx}
                                className={`px-2 py-0.5 border text-[11px] font-bold rounded-md select-none ${
                                  isChecked
                                    ? "bg-zinc-800/40 border-zinc-700/30 text-zinc-600"
                                    : "bg-cyan-500/10 border-cyan-400/20 text-cyan-300"
                                }`}
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Static roadmap if nothing generated yet */}
          {!roadmap && (
            <div className="relative border-l border-white/[0.05] ml-5 pl-10 space-y-8 select-none opacity-50 pointer-events-none">
              <div className="relative flex flex-col gap-2">
                <div className="absolute -left-[54px] top-1 w-7 h-7 rounded-full bg-[#121319] border border-white/5 flex items-center justify-center text-zinc-600 select-none">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-600 select-none">
                    Preview Roadmap Steps
                  </h3>
                  <p className="text-[13px] text-zinc-500 max-w-xl">
                    Generate your personalized career path above to view active goals and milestones.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
