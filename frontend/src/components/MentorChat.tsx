"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, X, MessageSquare, Loader2 } from "lucide-react";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MentorChatProps {
  resumeId: string;
}

const MentorChat: React.FC<MentorChatProps> = ({ resumeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your Senior AI Mentor. Upload your resume to get started, or ask me anything about your career path!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !resumeId) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/chat/mentor", {
        resume_id: resumeId,
        message: input,
        history: messages.slice(1) // Keep history without the first greeting
      });

      setMessages(prev => [...prev, { role: "assistant", content: response.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-full shadow-lg flex items-center justify-center z-50 text-white"
      >
        <MessageSquare className="w-8 h-8" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] glass rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-violet-600/20 to-pink-500/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Senior AI Mentor</h3>
                  <p className="text-xs text-green-400">Online & Ready to Help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-violet-600 text-white rounded-tr-none" 
                      : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-2xl rounded-tl-none border border-white/5 p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask your mentor..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1.5 p-2 bg-violet-600 rounded-lg text-white disabled:opacity-50 disabled:grayscale transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MentorChat;
