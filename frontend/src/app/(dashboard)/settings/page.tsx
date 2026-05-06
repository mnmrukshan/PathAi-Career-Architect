"use client";

import React, { useState, useEffect, useRef } from "react";
import { Settings, User, Moon, Sun, Zap, HelpCircle, Edit3, Save, Loader2, Camera, Mail, ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const { theme: currentTheme, setTheme, instantAnalysis, setInstantAnalysis } = useTheme();
  
  const [name, setName] = useState("Mohamed Rukshan");
  const [email, setEmail] = useState("m.rukshan@example.com");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/profile?user_id=demo-user-123");
        setName(res.data.name || "Mohamed Rukshan");
        setEmail(res.data.email || "m.rukshan@example.com");
        setAvatarUrl(res.data.avatar_url || null);
        
        // Sync theme and preferences from DB if they exist
        if (res.data.theme) setTheme(res.data.theme);
        if (res.data.instant_analysis !== undefined) setInstantAnalysis(res.data.instant_analysis);
        
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append("user_id", "demo-user-123");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("theme", currentTheme);
    formData.append("instant_analysis", String(instantAnalysis));
    
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const res = await axios.post("http://localhost:8000/api/user/profile", formData);
      toast.success("Identity Synchronized", {
        description: "Your parameters and environment themes are now persistent."
      });
      if (res.data.profile.avatar_url) {
        setAvatarUrl(res.data.profile.avatar_url);
      }
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Sync Failure");
    } finally {
      setIsSaving(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-600">Accessing Vault...</p>
        </div>
    );
  }

  return (
    <div className="space-y-10 max-w-5xl select-none pb-20 animate-in fade-in duration-700">
      <Toaster position="top-center" theme="dark" richColors />
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 font-display">
          Configuration
        </h1>
        <p className="text-[14.5px] font-medium text-zinc-400 max-w-2xl leading-relaxed">
          Tune your career intelligence parameters. Adjust profile semantics, aesthetic environments, and AI notification thresholds.
        </p>
      </div>

      <div className="space-y-8">
        {/* Professional Identity Section */}
        <div className="p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl space-y-8 hover:border-white/[0.08] transition-all">
          <div className="flex items-center justify-between border-b border-white/[0.03] pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                 <User className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Professional Identity</h3>
            </div>
            
            <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all
                  ${isSaving ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/10 active:scale-95"}
                `}
            >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {isSaving ? "Syncing..." : "Save Parameters"}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex items-center gap-6 group">
              <div className="relative">
                <div className="w-24 h-24 bg-[#161a24] border border-white/[0.04] rounded-full flex items-center justify-center text-2xl font-black text-white shadow-2xl relative overflow-hidden ring-4 ring-white/[0.02] ring-offset-4 ring-offset-[#090a0f]">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials || "MR"}</span>
                  )}
                  <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6 text-white mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-tighter">Update</span>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept="image/*" />
              </div>
              <div>
                <h4 className="text-[17px] font-black text-white mb-1 tracking-tight">Avatar Synthesis</h4>
                <p className="text-[12px] font-medium text-zinc-500 max-w-xs leading-relaxed italic">Upload headshot for corporate alignment optimization.</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 flex-1 w-full">
              <div className="space-y-2.5">
                <label className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase"><ShieldCheck className="w-3 h-3" /> Full Legal Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-4 bg-[#16171b]/60 border border-white/[0.06] hover:border-white/[0.1] rounded-2xl text-sm text-white outline-none transition-all focus:bg-[#1a1b20]" />
              </div>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase"><Mail className="w-3 h-3" /> Comm Channel</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 bg-[#16171b]/60 border border-white/[0.06] hover:border-white/[0.1] rounded-2xl text-sm text-white outline-none transition-all focus:bg-[#1a1b20]" />
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Theme Section */}
        <div className="p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl space-y-8 hover:border-white/[0.08] transition-all">
          <div className="flex items-center gap-3 border-b border-white/[0.03] pb-6">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
               <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-slate-200">Environmental Theme</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <ThemeOption 
                icon={<Moon className="w-4 h-4" />} 
                title="Dark Void" 
                sub="Minimalist dimming" 
                active={currentTheme === 'dark-void'} 
                onClick={() => setTheme('dark-void')}
            />
            <ThemeOption 
                icon={<Sun className="w-4 h-4" />} 
                title="High Contrast" 
                sub="Maximum readability" 
                active={currentTheme === 'high-contrast'} 
                onClick={() => setTheme('high-contrast')}
            />
            <ThemeOption 
                icon={<Zap className="w-4 h-4" />} 
                title="Neon Pulse" 
                sub="Aesthetic intensity" 
                active={currentTheme === 'neon-pulse'} 
                onClick={() => setTheme('neon-pulse')}
            />
          </div>
        </div>

        {/* System Preferences */}
        <div className="p-8 bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl space-y-8 hover:border-white/[0.08] transition-all">
          <div className="flex items-center gap-3 border-b border-white/[0.03] pb-6">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
               <Settings className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-slate-200">System Preferences</h3>
          </div>

          <div 
            onClick={() => setInstantAnalysis(!instantAnalysis)}
            className="flex items-center justify-between p-5 bg-[#14161d]/40 border border-white/[0.03] rounded-2xl hover:border-white/[0.06] transition-all group cursor-pointer"
          >
            <div>
              <h4 className="text-[14px] font-black text-white mb-1 group-hover:text-indigo-400 transition-colors">Enable Instant Analysis</h4>
              <p className="text-[11px] font-medium text-zinc-600 italic">Synthesize roadmap layers immediately without manual confirmation.</p>
            </div>
            <div className={`w-12 h-7 rounded-full flex items-center px-1.5 transition-all duration-300 ${instantAnalysis ? 'bg-indigo-600 justify-end shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'bg-zinc-800 justify-start'}`}>
              <div className="w-4.5 h-4.5 bg-white rounded-full shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeOption({ icon, title, sub, active, onClick }: { icon: any, title: string, sub: string, active: boolean, onClick: () => void }) {
    return (
        <div 
            onClick={onClick}
            className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer group
            ${active ? "bg-indigo-500/10 border-indigo-500/40 shadow-2xl shadow-indigo-500/5" : "bg-[#14161d]/60 border-white/[0.02] hover:border-white/[0.08]"}
        `}>
            <div className="flex items-center gap-4">
                <div className={`w-11 h-11 border rounded-xl flex items-center justify-center transition-all
                    ${active ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" : "bg-[#191a24] border-white/[0.03] text-zinc-500"}
                `}>
                    {icon}
                </div>
                <div>
                    <h4 className="text-[14px] font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">{title}</h4>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">{sub}</p>
                </div>
            </div>
            {active && <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] shadow-lg shadow-indigo-500/20">✓</div>}
        </div>
    )
}
