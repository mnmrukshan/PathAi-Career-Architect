"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, CircleDot, Trash2, Calendar, Layout, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [firstName, setFirstName] = useState("Rukshan");
  const [savedRoadmaps, setSavedRoadmaps] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [roadmapsRes, statsRes, profileRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/saved-roadmaps?user_id=demo-user-123"),
        axios.get("http://127.0.0.1:8000/api/dashboard/stats?user_id=demo-user-123"),
        axios.get("http://127.0.0.1:8000/api/user/profile?user_id=demo-user-123")
      ]);
      setSavedRoadmaps(roadmapsRes.data);
      setStats(statsRes.data);
      if (profileRes.data.name) {
        setFirstName(profileRes.data.name.split(" ")[0]);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
      toast.error("Sync Error", {
        description: "Failed to load real-time career metrics from the vault."
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this roadmap?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/roadmap/${id}`);
      setSavedRoadmaps(prev => prev.filter(r => r._id !== id));
      toast.success("Trajectory Purged");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Operation Failed");
    }
  };

  const handleCardClick = (id: string) => {
    router.push(`/resume-builder?roadmap_id=${id}`);
  };

  const latestInterview = stats?.latest_interview;
  const profileScore = stats?.profile_score || 0;

  return (
    <div className="space-y-10 select-none max-w-5xl pb-20">
      <Toaster position="top-center" theme="dark" richColors />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 font-display">
            Welcome back, {firstName}.
          </h1>
          <p className="text-[14.5px] font-medium text-zinc-400 max-w-xl leading-relaxed">
            Your personalized career growth strategies are ready. Manage and track your progress below.
          </p>
        </div>

        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#101c18] border border-emerald-500/30 rounded-xl select-none flex-shrink-0 self-start md:self-center">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-[11px] font-black tracking-wider text-emerald-400 uppercase select-none">
            AI ENGINE: READY
          </span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Saved Roadmaps Section (Fixed Layout) */}
        <div className="md:col-span-2 p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl flex flex-col justify-start hover:border-white/[0.08] transition-all min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-slate-200 font-display">Saved Roadmaps</h3>
            </div>
            <Link
              href="/resume-builder"
              className="text-[10px] font-black text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-1.5 uppercase tracking-widest"
            >
              Build New Path
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-zinc-600">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500/40" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing...</p>
              </div>
            ) : savedRoadmaps.length > 0 ? (
              savedRoadmaps.map((r: any, idx: number) => {
                const isInvalid = !r.roadmap || r.roadmap.length === 0;
                return (
                  <div
                    key={r._id || idx}
                    onClick={() => !isInvalid && handleCardClick(r._id)}
                    className={`p-6 bg-[#14161d]/80 hover:bg-[#1a1c24] border group relative transition-all rounded-2xl flex items-center justify-between gap-6 
                      ${isInvalid ? "border-red-500/10 opacity-60 cursor-default" : "border-white/[0.03] hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/5 cursor-pointer"}
                    `}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-[16px] font-black text-white group-hover:text-cyan-400 transition-colors capitalize tracking-tight font-display">
                          {r.target_role}
                        </h4>
                      </div>
                      <p className="text-[12px] text-zinc-500 font-medium max-w-sm line-clamp-1 italic">
                        {r.skill_gap?.length > 0 ? `Gaps: ${r.skill_gap.join(", ")}` : "Profile perfectly aligned for this role."}
                      </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-right min-w-[60px]">
                          <p className={`text-2xl font-black leading-none mb-1 ${isInvalid ? "text-zinc-700" : "text-cyan-400"}`}>
                            {r.roadmap?.length || 0}
                          </p>
                          <span className="text-[9px] font-black tracking-[0.2em] text-zinc-600 uppercase">Weeks</span>
                        </div>
                        <button
                          onClick={(e) => handleDelete(e, r._id)}
                          className="p-3 bg-[#1c1d24] hover:bg-red-500/10 border border-white/[0.04] hover:border-red-500/30 text-zinc-600 hover:text-red-400 rounded-xl transition-all shadow-sm active:scale-95"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 border border-dashed border-white/[0.05] rounded-3xl bg-white/[0.01]">
                <p className="text-[11px] text-zinc-600 font-black uppercase tracking-[0.3em]">No Roadmaps Logged</p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Sidebar Widgets */}
        <div className="space-y-8">
            {/* Dynamic Next Interview Widget */}
            <div 
              onClick={() => router.push("/interview-coach")}
              className="p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all text-center group cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2 mb-8">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-[14px] font-bold text-slate-200">Interview Status</h3>
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-16 h-16 bg-[#14161d] border border-white/[0.04] group-hover:border-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 shadow-2xl transition-all select-none">
                  <Layout className="w-7 h-7" />
                </div>

                {latestInterview?.target_role ? (
                    <>
                        <h4 className="text-2xl font-black text-white mb-1 tracking-tight capitalize font-display">{latestInterview.target_role}</h4>
                        <p className="text-[13px] text-zinc-500 font-medium mb-8">Last Practice Session</p>
                        <div className="px-5 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl group-hover:bg-indigo-500/20 transition-all">
                            <span className="text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase">Practice Again</span>
                        </div>
                    </>
                ) : (
                    <>
                        <h4 className="text-xl font-black text-zinc-400 mb-1 tracking-tight italic font-display">Ready to practice?</h4>
                        <p className="text-[12px] text-zinc-600 font-medium mb-8">No interview history found</p>
                        <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-white/10 transition-all">
                            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">Launch Coach</span>
                        </div>
                    </>
                )}
              </div>
            </div>

            {/* Dynamic Profile Score Widget */}
            <div className="p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl flex items-center justify-between gap-6 hover:border-white/[0.08] transition-all relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Match Score</h3>
                </div>
                {profileScore > 0 ? (
                    <>
                        <p className="text-xl font-black text-white leading-tight">{profileScore}<span className="text-xs text-zinc-600 ml-1">/100</span></p>
                        <p className="text-[10px] text-emerald-400 font-black uppercase tracking-tighter mt-1">Market Verified</p>
                    </>
                ) : (
                    <>
                        <p className="text-sm font-bold text-zinc-600 leading-tight italic">No Score Yet</p>
                        <p className="text-[9px] text-zinc-700 font-black uppercase tracking-tighter mt-1">Analyze CV to view</p>
                    </>
                )}
              </div>

              <div className="relative flex items-center justify-center scale-110">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="34" 
                    stroke="url(#dashGradient)" 
                    strokeWidth="6" 
                    strokeDasharray={2 * Math.PI * 34} 
                    strokeDashoffset={2 * Math.PI * 34 * (1 - (profileScore || 0)/100)} 
                    strokeLinecap="round" 
                    fill="transparent" 
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] transition-all duration-1000" 
                  />
                  <defs>
                    <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
