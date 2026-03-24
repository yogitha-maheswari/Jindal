"use client";

import { GlassCard } from "@/components/GlassCard";
import { Brain, BarChart3, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { insights } from "@/data/insights";
import { leadScores } from "@/data/leads";

// Icon + theme helpers keyed by insight type
const insightIconMap = {
  opportunity: {
    icon: Zap,
    chip: "gradient-accent text-primary-foreground",
    tile: "gradient-primary text-primary-foreground",
  },
  alert: {
    icon: BarChart3,
    chip: "gradient-accent text-primary-foreground",
    tile: "gradient-primary text-primary-foreground",
  },
  timing: {
    icon: Brain,
    chip: "gradient-accent text-primary-foreground",
    tile: "gradient-primary text-primary-foreground",
  },
};

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-350 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.03em] text-foreground">AI Insights</h1>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {insights.map((insight, i) => {
          const { icon: Icon, chip, tile } = insightIconMap[insight.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[28px] border border-border/60 bg-card px-6 py-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tile}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`inline-flex items-center rounded-2xl px-3.5 py-1.5 text-sm font-semibold shadow-sm ${chip}`}>
                  {insight.confidence}% confidence
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
                {insight.title}
              </h3>
              <p className="mb-7 max-w-[62ch] text-sm leading-7 text-muted-foreground">{insight.description}</p>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent">
                {insight.action} <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Lead Score Breakdown */}
      <GlassCard delay={0.3} className="rounded-[30px] border-border/60 bg-card p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold tracking-[-0.02em] text-foreground">Top Lead Scores Breakdown</h3>
        <div className="space-y-5">
          {leadScores.map((lead, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-3xl border border-border/40 bg-muted/20 px-5 py-5 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-primary text-base font-bold text-primary-foreground">
                  {lead.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-lg font-semibold tracking-[-0.02em] text-foreground">{lead.name}</span>
                        <span className="text-sm text-muted-foreground">{lead.company}</span>
                      </div>
                    </div>
                    <span className="shrink-0 text-2xl font-bold gradient-text">{lead.score}</span>
                  </div>
                  <div className="mb-4 h-2 rounded-full border border-border/60 bg-border/70 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lead.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full gradient-primary"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lead.factors.map((f) => (
                      <span
                        key={f}
                        className="inline-flex min-h-10 min-w-40 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 px-4 py-2 text-xs font-medium text-primary"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
