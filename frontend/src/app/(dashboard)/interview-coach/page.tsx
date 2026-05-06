"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, StopCircle, User, Sparkles, Mic, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "sonner";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function InterviewCoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Welcome to your mock interview. I'm PathAI, and I'll be assessing your fit for the Senior Product Designer role. We'll focus on behavioral and strategic design questions today. Are you ready to begin?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetRole, setTargetRole] = useState("Senior Product Designer");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Map frontend history to backend expected history format
      const history = messages.map(m => ({
        role: m.role === "ai" ? "model" : "user",
        content: m.content
      }));
      history.push({ role: "user", content: userMessage.content });

      const response = await axios.post("http://localhost:8000/api/v1/interview/chat", {
        target_role: targetRole,
        history: history
      });

      setMessages(prev => [...prev, { role: "ai", content: response.data.response }]);
    } catch (error) {
      console.error("Failed to get AI response", error);
      toast.error("AI Interviewer is temporarily unavailable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    toast.promise(
      axios.post("http://localhost:8000/api/v1/interview/end", {
        user_id: "demo_user_123", // Replace with real user ID from auth
        target_role: targetRole,
        transcript: messages.map(m => ({
          role: m.role === "ai" ? "model" : "user",
          content: m.content
        }))
      }),
      {
        loading: 'Ending session and generating final evaluation...',
        success: (res) => {
          console.log("Session saved:", res.data);
          return `Session saved successfully! Evaluation: ${res.data.evaluation.substring(0, 50)}...`;
        },
        error: 'Failed to persist session data.',
      }
    );
  };

  return (
    <div className="space-y-8 select-none max-w-5xl mx-auto pb-10">
      <Toaster position="top-center" theme="dark" richColors />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0d0e12]/60 border border-white/[0.04] p-5 rounded-2xl backdrop-blur-xl hover:border-white/[0.08] transition-all">
        <div>
          <h2 className="text-xl font-extrabold text-white mb-1">
            Mock Interview
          </h2>
          <div className="flex items-center gap-4 text-[12.5px] font-medium text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_#22d3ee]" />
              Session Active
            </span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span>{targetRole}</span>
          </div>
        </div>

        <button
          onClick={handleEndSession}
          className="px-4 py-2 bg-[#1b1c21] hover:bg-red-500/10 hover:text-red-400 border border-white/[0.04] hover:border-red-500/20 text-zinc-300 font-bold text-xs tracking-wider uppercase transition-all rounded-xl cursor-pointer"
        >
          End Session
        </button>
      </div>

      {/* Main Interface */}
      <div className="bg-[#0f1015]/70 border border-white/[0.04] backdrop-blur-xl rounded-2xl p-7 flex flex-col justify-between hover:border-white/[0.08] transition-all min-h-[600px]">
        
        {/* Chat Window */}
        <div className="space-y-6 flex-1 py-4 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pr-2">
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-[#15171d] text-[10px] text-zinc-600 border border-white/[0.02] rounded-lg tracking-widest font-black uppercase">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-4 max-w-2xl ${msg.role === "user" ? "ml-auto justify-end" : ""}`}
            >
              {msg.role === "ai" && (
                <div className="w-10 h-10 bg-[#15171d] border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.1)]">
                  <MessageSquare className="w-4.5 h-4.5" />
                </div>
              )}
              
              <div className={`p-4 rounded-2xl text-[13.5px] font-medium leading-relaxed transition-all shadow-sm
                ${msg.role === "ai" 
                  ? "bg-[#14161d] border border-white/[0.03] hover:border-white/[0.06] text-zinc-300" 
                  : "bg-[#4f46e5]/10 border border-indigo-500/30 text-zinc-200 text-right"
                }
              `}>
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="w-10 h-10 bg-[#1c1a2e] border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400 flex-shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.15)]">
                  <User className="w-4.5 h-4.5" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-10 h-10 bg-[#15171d] border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.1)]">
                <MessageSquare className="w-4.5 h-4.5" />
              </div>
              <div className="p-4 bg-[#14161d]/60 border border-white/[0.03] rounded-2xl text-[13.5px] text-zinc-500 font-medium flex items-center gap-2">
                <span className="animate-pulse">PathAI is thinking</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Input Bar */}
        <form 
          onSubmit={handleSendMessage}
          className="border-t border-white/[0.04] pt-6 flex items-center gap-4"
        >
          <div className="flex-1 relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response to the interviewer..."
              disabled={isLoading}
              className="w-full bg-[#101319] border border-white/[0.03] focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 rounded-2xl px-6 py-4 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none transition-all disabled:opacity-50"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
               <span className="text-[9px] font-black text-zinc-700 tracking-tighter uppercase">Enter to Send</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 bg-[#15171d] hover:bg-cyan-500/10 border border-white/[0.05] hover:border-cyan-500/40 rounded-2xl flex items-center justify-center text-cyan-400 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 group-hover:scale-110 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
}
