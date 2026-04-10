"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUpload from "@/components/ResumeUpload";
import RoleSelector from "@/components/RoleSelector";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import DashboardLayout from "@/components/DashboardLayout";
import MentorChat from "@/components/MentorChat";
import axios from "axios";
import { Sparkles, BrainCircuit, Rocket } from "lucide-react";

type Step = "UPLOAD" | "ROLE" | "DASHBOARD";

export default function Home() {
  const [step, setStep] = useState<Step>("UPLOAD");
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (data: any) => {
    setResumeId(data.id);
    setAnalysisData(data.data);
    setStep("ROLE");
  };

  const handleRoleSelect = async (targetRole: string) => {
    if (!resumeId) return;
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/roadmap/generate", {
        resume_id: resumeId,
        target_role: targetRole
      });
      setRoadmapData(response.data);
      setStep("DASHBOARD");
    } catch (error) {
      console.error("Failed to generate roadmap", error);
      alert("Something went wrong while generating your roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/10 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-lg">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">PathAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">How it Works</a>
          <a href="#" className="hover:text-white transition-colors">Success Stories</a>
          <button className="px-5 py-2 rounded-full border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all">
            Sign In
          </button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === "UPLOAD" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-6">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-violet-400 text-sm font-bold uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4" />
                  Next-Gen Career Architect
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                  Design Your <span className="text-gradient">Future</span> with Precision AI.
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Upload your resume and let our AI mentor analyze your skill gaps and architect a week-by-week roadmap to your dream role.
                </p>
              </div>
              <ResumeUpload onSuccess={handleUploadSuccess} />
            </motion.div>
          )}

          {step === "ROLE" && (
            <motion.div
              key="role"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <RoleSelector onSelect={handleRoleSelect} loading={loading} />
            </motion.div>
          )}

          {step === "DASHBOARD" && roadmapData && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-16"
            >
              <div className="relative overflow-hidden p-10 rounded-3xl glass border-violet-500/20 group">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:scale-175 transition-transform duration-1000">
                  <Sparkles className="w-64 h-64 text-white" />
                </div>
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-black uppercase tracking-widest">
                    Strategy Unlocked 🚀
                  </div>
                  <h1 className="text-5xl font-black text-white leading-none">
                    Mission Control: <span className="text-gradient">Ready.</span>
                  </h1>
                  <p className="text-gray-400 text-lg max-w-xl">
                    We've synthesized your experience with market demands for <span className="text-white font-bold">{roadmapData.target_role}</span>.
                  </p>
                </div>
              </div>

              <DashboardLayout roadmapData={roadmapData}>
                <RoadmapTimeline 
                  roadmap={roadmapData.roadmap} 
                  targetRole={roadmapData.target_role} 
                />
              </DashboardLayout>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Chat */}
      {resumeId && <MentorChat resumeId={resumeId} />}
      
      <footer className="relative z-10 py-12 text-center text-gray-500 text-sm border-t border-white/5 mt-20">
        <p>&copy; 2026 PathAI Career Architect. Powered by Gemini 1.5 Pro.</p>
      </footer>
    </div>
  );
}
