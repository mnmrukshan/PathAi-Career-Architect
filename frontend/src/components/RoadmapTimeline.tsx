"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, ExternalLink, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";

interface RoadmapStep {
  week: number;
  goal: string;
  topics: string[];
  resources: { title: string; url: string }[];
  task: string;
}

interface RoadmapTimelineProps {
  roadmap: RoadmapStep[];
  targetRole: string;
}

const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ roadmap, targetRole }) => {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Evolutionary <span className="text-gradient">Roadmap</span>
        </h2>
        <div className="px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest">
          {roadmap.length} Week Intensive
        </div>
      </div>

      <div className="relative space-y-16">
        {/* Animated Background Line */}
        <div className="absolute left-10 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-pink-500/50 to-transparent" />

        {roadmap.map((step, index) => (
          <motion.div
            key={step.week}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-24 group"
          >
            {/* Week Indicator */}
            <div className="absolute left-0 top-0">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 rounded-3xl glass-card flex flex-col items-center justify-center border-violet-500/30 shadow-lg shadow-violet-500/10"
              >
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Phase</span>
                <span className="text-3xl font-black text-white">{step.week}</span>
                <div className="absolute -bottom-1 w-8 h-1 bg-violet-500 rounded-full" />
              </motion.div>
            </div>

            <div className="glass-card group-hover:border-violet-500/40 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Focus */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400 mt-1">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.goal}</h3>
                      <div className="flex flex-wrap gap-2">
                        {step.topics.map((topic, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-violet-400 rounded-full" />
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-pink-500" />
                      Learning Architecture
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {step.resources.map((res, i) => (
                        <a
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-xl hover:border-violet-500/50 hover:bg-violet-500/5 transition-all text-sm text-gray-400 hover:text-white"
                        >
                          <span className="truncate max-w-[150px]">{res.title}</span>
                          <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mission / Task */}
                <div className="relative">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent lg:hidden" />
                  <div className="lg:h-full lg:w-px lg:absolute lg:left-0 lg:top-0 lg:bottom-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                  
                  <div className="lg:pl-8 h-full flex flex-col justify-center">
                    <div className="p-6 bg-gradient-to-br from-violet-600/10 to-pink-600/10 rounded-2xl border border-white/5 space-y-3 relative overflow-hidden group/mission">
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover/mission:opacity-20 transition-opacity">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <h4 className="text-xs font-black text-pink-500 uppercase tracking-tighter">Mission of the Week</h4>
                      <p className="text-sm text-gray-200 leading-relaxed font-medium italic">
                        "{step.task}"
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase pt-2">
                        Critical Milestone <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
