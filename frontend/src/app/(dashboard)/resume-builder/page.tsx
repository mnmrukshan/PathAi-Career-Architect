"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Sparkles, FileText, ArrowRight, Loader2, AlertCircle, Target, Briefcase, Map, CheckCircle2, Link as LinkIcon, Calendar, Type } from "lucide-react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface Resource {
  title: string;
  url: string;
}

interface RoadmapItem {
  week: number;
  goal: string;
  topics: string[];
  resources: Resource[];
  task: string;
}

interface RoadmapResponse {
  skill_gap: string[];
  roadmap: RoadmapItem[];
  target_role?: string;
}

export default function RoadmapArchitectPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [manualSkills, setManualSkills] = useState("");
  const [entryMode, setEntryMode] = useState<"pdf" | "manual">("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<RoadmapResponse | null>(null);
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get("roadmap_id");

  useEffect(() => {
    if (roadmapId) {
      const fetchSavedRoadmap = async () => {
        setIsGenerating(true);
        setResult(null);
        try {
          const res = await axios.get(`http://localhost:8000/api/roadmap/${roadmapId}`);
          setResult(res.data);
          if (res.data.target_role) {
            setTargetRole(res.data.target_role);
          }
        } catch (err) {
          console.error("Failed to fetch saved roadmap", err);
          toast.error("Vault Access Error", {
            description: "Could not retrieve the selected roadmap from the intelligence archive."
          });
        } finally {
          setIsGenerating(false);
        }
      };
      fetchSavedRoadmap();
    }
  }, [roadmapId]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    disabled: entryMode === "manual"
  });

  const handleGenerate = async () => {
    if (!targetRole.trim()) {
      toast.error("Missing Role", {
        description: "Please enter your target role.",
      });
      return;
    }

    if (entryMode === "pdf" && !file) {
      toast.error("Missing File", {
        description: "Please upload your resume PDF.",
      });
      return;
    }

    if (entryMode === "manual" && !manualSkills.trim()) {
      toast.error("Missing Skills", {
        description: "Please provide your current skills for analysis.",
      });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      let response;
      if (entryMode === "pdf") {
        const formData = new FormData();
        formData.append("file", file!);
        formData.append("target_role", targetRole.trim());
        response = await axios.post("http://localhost:8000/api/generate-roadmap-pdf", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("http://localhost:8000/api/generate-roadmap-manual", {
          user_id: "demo-user-123",
          target_role: targetRole.trim(),
          skills: manualSkills.trim()
        });
      }
      
      const data = response.data;
      
      if (data && Array.isArray(data.roadmap)) {
        setResult(data);
        toast.success("Success!", {
          description: "12-week roadmap architected successfully.",
        });
      } else {
        throw new Error("Invalid roadmap format received from AI.");
      }
      
    } catch (err: any) {
      console.error("Roadmap generation error:", err);
      toast.error("Generation Failed", {
        description: err.response?.data?.detail || err.message || "Could not generate roadmap. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" theme="dark" richColors />
      <div className="space-y-10 select-none max-w-6xl mx-auto pb-20">
        {/* Header Section */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
               <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            Roadmap Architect
          </h1>
          <p className="text-[14.5px] font-medium text-zinc-400 max-w-2xl ml-1 leading-relaxed">
            Consolidated intelligence engine. Bridge your gaps by uploading a CV or manually entering your profile.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-5 items-stretch">
          {/* Left Side: Input area */}
          <div className="md:col-span-2 flex flex-col space-y-6">
            
            {/* Mode Switcher */}
            <div className="flex bg-[#0f1015]/70 border border-white/[0.04] p-1.5 rounded-2xl">
                <button 
                  onClick={() => setEntryMode("pdf")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all
                    ${entryMode === "pdf" ? "bg-white/[0.05] text-white shadow-xl" : "text-zinc-600 hover:text-zinc-400"}
                  `}
                >
                    <FileText className="w-3.5 h-3.5" />
                    PDF Upload
                </button>
                <button 
                  onClick={() => setEntryMode("manual")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all
                    ${entryMode === "manual" ? "bg-white/[0.05] text-white shadow-xl" : "text-zinc-600 hover:text-zinc-400"}
                  `}
                >
                    <Type className="w-3.5 h-3.5" />
                    Manual Entry
                </button>
            </div>

            {/* Target Role Input Card */}
            <div className="p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl space-y-4 hover:border-white/[0.08] transition-all group">
              <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                <Target className="w-4 h-4" />
                Target Career Goal
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-[#1c1d24] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {entryMode === "pdf" ? (
                /* PDF Upload card */
                <div 
                    {...getRootProps()}
                    className={`p-10 bg-[#0f1015]/70 border backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center text-center gap-5 transition-all min-h-[260px] cursor-pointer group
                        ${isDragActive ? "border-indigo-500/50 bg-indigo-500/5" : "border-white/[0.04] hover:border-white/[0.08] hover:shadow-2xl hover:shadow-indigo-500/5"}
                    `}
                >
                    <input {...getInputProps()} />
                    <div className={`w-14 h-14 border rounded-2xl flex items-center justify-center transition-all duration-500
                        ${isDragActive ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 scale-110" : "bg-[#171a21] border-white/[0.03] text-indigo-400 group-hover:border-indigo-500/30"}
                    `} >
                        {file ? <FileText className="w-7 h-7" /> : <UploadCloud className="w-7 h-7" />}
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-200">
                        {file ? "Resume Loaded" : "Upload Resume"}
                        </h3>
                        <p className="text-xs font-medium text-zinc-500 leading-relaxed px-4">
                        {file ? file.name : "Drag & drop your PDF CV here to begin analysis"}
                        </p>
                    </div>
                </div>
            ) : (
                /* Manual Entry card */
                <div className="p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl space-y-4 hover:border-white/[0.08] transition-all group">
                    <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                        <FileText className="w-4 h-4" />
                        Skills & Experience
                    </label>
                    <textarea
                        rows={6}
                        placeholder="List your skills, experience, and certifications here..."
                        value={manualSkills}
                        onChange={(e) => setManualSkills(e.target.value)}
                        className="w-full bg-[#1c1d24] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
                    />
                </div>
            )}

            <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-[14px] font-black tracking-widest uppercase transition-all mt-auto
                  ${(isGenerating) 
                    ? "bg-[#1c1d24] text-zinc-600 border border-white/[0.02] cursor-not-allowed" 
                    : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-500/20"}
                `}
              >
                {isGenerating ? (
                    <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                        Generating...
                    </div>
                ) : (
                    <>
                        Start Analysis
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
          </div>

          {/* Right Side: Results View */}
          <div className="md:col-span-3">
            {!result && !isGenerating ? (
               <div className="h-full bg-[#0f1015]/40 border border-dashed border-white/[0.05] rounded-3xl flex flex-col items-center justify-center text-zinc-600 p-12 text-center">
                  <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6">
                    <Map className="w-10 h-10 text-zinc-800" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-400 mb-2 font-display">Awaiting Analysis</h3>
                  <p className="text-sm max-w-xs leading-relaxed font-medium">Your personalized 12-week roadmap will appear here once the AI architecture process is complete.</p>
               </div>
            ) : isGenerating ? (
               <div className="h-full bg-[#0f1015]/70 border border-indigo-500/20 backdrop-blur-3xl rounded-3xl flex flex-col items-center justify-center p-12 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" />
                  <div className="relative mb-8 scale-110">
                     <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
                     <Loader2 className="w-20 h-20 text-indigo-500 animate-spin relative z-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Architecting Your Path</h3>
                  <p className="text-[14px] text-zinc-400 max-w-sm font-medium leading-relaxed">
                    PathAI is mapping your current skillset against the <span className="text-indigo-400 font-bold">"{targetRole}"</span> landscape using Gemini Flash intelligence.
                  </p>
               </div>
            ) : result ? (
               <div className="h-full animate-in fade-in duration-1000">
                  {/* Skill Gap Analysis Section */}
                  {result.skill_gap && result.skill_gap.length > 0 && (
                    <div className="bg-[#1c1212]/40 border border-red-500/5 rounded-2xl p-8 relative overflow-hidden group shadow-[0_10px_40px_-15px_rgba(220,38,38,0.1)]">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500/40 group-hover:bg-red-500 transition-colors" />
                      <h3 className="text-[11px] font-black text-red-400/80 mb-6 flex items-center gap-2 uppercase tracking-widest">
                        <AlertCircle className="w-3.5 h-3.5" /> Skill Architecture Gaps
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {result.skill_gap.map((gap: string, i: number) => (
                          <span key={i} className="px-4 py-2 bg-red-500/5 border border-red-500/10 text-red-200/90 rounded-xl text-[12px] font-bold hover:bg-red-500/10 hover:shadow-[0_0_12px_rgba(239,68,68,0.15)] hover:border-red-500/30 transition-all duration-300 cursor-default">
                            {gap}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            ) : null}
          </div>
        </div>

        {/* Full-Width Roadmap Section */}
        {result && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pt-10">
            {/* Visual Divider */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent">
                <div className="absolute inset-0 blur-sm bg-indigo-500/10" />
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between px-4">
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Sparkles className="w-6 h-6 text-indigo-400" />
                      </div>
                      12-Week Strategic Roadmap
                  </h3>
                  <div className="flex items-center gap-3 bg-[#0f1015]/60 px-4 py-2 rounded-full border border-white/[0.03]">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Live Strategy Mode</span>
                  </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                  {result.roadmap.map((item: any, idx: number) => (
                  <div key={idx} className="bg-[#0f1015]/80 border border-white/[0.04] backdrop-blur-xl rounded-3xl p-8 hover:border-indigo-500/40 transition-all duration-500 group relative">
                      {/* Animated progress indicator */}
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-white/[0.02] group-hover:bg-indigo-500/20 transition-all overflow-hidden">
                          <div className="w-full h-1/3 bg-indigo-500 shadow-[0_0_15px_#6366f1] group-hover:translate-y-full transition-transform duration-[2000ms]" />
                      </div>

                      <div className="flex flex-col md:flex-row gap-10 pl-4">
                          <div className="flex-shrink-0">
                              <div className="w-20 h-20 bg-[#16181d] border border-white/[0.05] group-hover:border-indigo-500/30 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <span className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors relative z-10">
                                      {item.week < 10 ? `0${item.week}` : item.week}
                                  </span>
                              </div>
                              <div className="mt-3 text-center">
                                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Week</span>
                              </div>
                          </div>
                          
                          <div className="flex-1 space-y-8">
                              <div>
                                  <div className="flex flex-wrap items-center gap-4 mb-3">
                                      <span className="px-3 py-1 bg-indigo-500/10 text-[10px] font-black text-indigo-400 rounded-full border border-indigo-500/20 tracking-tighter">PHASE {Math.ceil(item.week/4)}</span>
                                      <h4 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{item.goal}</h4>
                                  </div>
                                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em] ml-1">Learning Milestones</p>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                  <div className="space-y-5">
                                      <h5 className="text-[11px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Knowledge Modules
                                      </h5>
                                      <ul className="grid grid-cols-1 gap-4">
                                          {item.topics.map((topic: string, tIdx: number) => (
                                              <li key={tIdx} className="flex items-start gap-3 text-[14.5px] text-zinc-400 font-medium group/item">
                                                  <div className="w-5 h-5 rounded-md bg-white/[0.02] border border-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-indigo-400/30 transition-colors">
                                                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 group-hover/item:text-indigo-400" />
                                                  </div>
                                                  {topic}
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                                  
                                  <div className="space-y-5">
                                      <h5 className="text-[11px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Recommended Media
                                      </h5>
                                      <div className="grid grid-cols-1 gap-3">
                                          {item.resources.map((res: any, rIdx: number) => (
                                              <a key={rIdx} href={res.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-[14px] text-zinc-300 hover:bg-indigo-500/5 hover:border-indigo-500/20 transition-all group/res">
                                                  <div className="flex items-center gap-3 truncate">
                                                      <div className="p-1.5 bg-indigo-500/10 rounded-lg group-hover/res:bg-indigo-500/20 transition-colors">
                                                        <LinkIcon className="w-4 h-4 text-indigo-400" />
                                                      </div>
                                                      <span className="truncate font-semibold tracking-tight">{res.title}</span>
                                                  </div>
                                                  <ArrowRight className="w-4 h-4 text-zinc-800 group-hover/res:text-indigo-400 group-hover/res:translate-x-1 transition-all" />
                                              </a>
                                          ))}
                                      </div>
                                  </div>
                              </div>

                              {/* Actionable Task Section */}
                              <div className="pt-8 border-t border-white/[0.03]">
                                  <div className="flex items-start gap-6 p-6 bg-[#1c1d24]/40 rounded-3xl border border-white/[0.02] group-hover:border-indigo-500/10 transition-all shadow-inner">
                                      <div className="w-12 h-12 bg-zinc-900/50 border border-white/[0.05] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/10 transition-colors shadow-lg">
                                          <Target className="w-6 h-6 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                                      </div>
                                      <div>
                                          <h5 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                              Execution Challenge 
                                              <span className="w-1.5 h-1.5 bg-indigo-500/30 rounded-full" />
                                          </h5>
                                          <p className="text-[15px] text-zinc-300 font-medium leading-relaxed italic opacity-90">"{item.task}"</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
