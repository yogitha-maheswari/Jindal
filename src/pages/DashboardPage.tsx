"use client";

import { StatCard } from "@/components/StatCard";
import { GlassCard } from "@/components/GlassCard";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  dashboardStats,
  weeklyEngagementData,
  monthlyPipelineData,
  funnelSteps,
  recentActivity,
  channelPerformance,
  insights,
  aiMetrics,
} from "@/data/dashboard";
import { leadSourceSummary } from "@/data/leads";
import {
  Zap, Brain, ArrowRight,
  AlertTriangle, Clock,
} from "lucide-react";

const chartGridStroke = "hsl(var(--border))";
const chartTickColor = "hsl(var(--muted-foreground))";
const chartTooltipBackground = "hsl(var(--card))";
const chartTooltipBorder = "1px solid hsl(var(--border))";
const chartTooltipText = "hsl(var(--foreground))";
const chartPrimary = "hsl(var(--primary))";
const chartAccent = "hsl(var(--gradient-end))";
const chartSuccess = "hsl(var(--success))";

// ── Insight styling ────────────────────────────────────────────────────────────

const insightStyle = {
  opportunity: {
    Icon: Zap,
    badge: "gradient-accent text-primary-foreground",
    iconBg: "gradient-primary text-primary-foreground",
    accent: "hsl(var(--primary))",
    metricClass: "gradient-text",
    actionClass: "text-primary",
    label: "Opportunity",
  },
  timing: {
    Icon: Clock,
    badge: "gradient-accent text-primary-foreground",
    iconBg: "gradient-primary text-primary-foreground",
    accent: "hsl(var(--primary))",
    metricClass: "gradient-text",
    actionClass: "text-primary",
    label: "Timing",
  },
  alert: {
    Icon: AlertTriangle,
    badge: "gradient-accent text-primary-foreground",
    iconBg: "gradient-primary text-primary-foreground",
    accent: "hsl(var(--accent))",
    metricClass: "gradient-text",
    actionClass: "text-primary",
    label: "Alert",
  },
} as const;

// ── Confidence ring ────────────────────────────────────────────────────────────

function ConfidenceRing({ value, color }: { value: number; color: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <svg width={44} height={44} className="-rotate-90">
      <circle cx={22} cy={22} r={r} fill="none" stroke="currentColor" strokeWidth={3} className="text-border/40" />
      <motion.circle
        cx={22} cy={22} r={r} fill="none"
        stroke={color} strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={`${circ}`}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <text
        x={22} y={22}
        dominantBaseline="central" textAnchor="middle"
        fontSize={9} fontWeight={700}
        fill="currentColor"
        className="text-foreground rotate-90 origin-center"
        style={{ transform: "rotate(90deg)", transformOrigin: "22px 22px" }}
      >
        {value}
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="space-y-7 max-w-350 mx-auto">

      {/* ── Page header ── */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            delay={stat.delay}
          />
        ))}
      </div>

      {/* ── AI Performance row ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {aiMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.07 }}
            className="rounded-3xl border border-border/60 bg-card/90 px-5 py-5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl gradient-primary">
                <m.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-bold leading-none text-foreground">{m.value}</p>
                <p className="mt-3 text-sm font-semibold leading-snug text-foreground">{m.label}</p>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">{m.sub}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Charts row 1 ── */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">

        {/* Lead Engagement Trend */}
        <GlassCard delay={0.2} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Lead Engagement Trend</h3>
          <div className="flex-1 min-h-75">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyEngagementData} margin={{ top: 8, right: 20, left: 6, bottom: 14 }}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="qualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--accent))" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="hsl(var(--success))" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} strokeOpacity={0.18} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} height={28} />
                <YAxis width={34} tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: chartTooltipBackground, border: chartTooltipBorder, borderRadius: "12px", fontSize: "12px" }}
                  labelStyle={{ color: chartTooltipText, fontWeight: 600 }}
                  itemStyle={{ color: chartTooltipText }}
                />
                <Area type="monotone" dataKey="leads" name="Leads" stroke={chartPrimary} fill="url(#leadGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="qualified" name="Qualified" stroke={chartAccent} fill="url(#qualGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="converted" name="Converted" stroke={chartSuccess} fill="url(#convGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 pl-6">
            {[
              { color: chartPrimary, label: "Leads" },
              { color: chartAccent, label: "Qualified" },
              { color: chartSuccess, label: "Converted" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Monthly Pipeline */}
        <GlassCard delay={0.25} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Monthly Pipeline Growth</h3>
          <div className="flex-1 min-h-75">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPipelineData} margin={{ top: 8, right: 20, left: 6, bottom: 14 }}>
                <defs>
                  <linearGradient id="pipelineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} strokeOpacity={0.18} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} height={28} />
                <YAxis width={34} tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: chartTooltipBackground, border: chartTooltipBorder, borderRadius: "12px", fontSize: "12px" }}
                  labelStyle={{ color: chartTooltipText, fontWeight: 600 }}
                  itemStyle={{ color: chartTooltipText }}
                  formatter={(v) => [`${v} leads`, "Pipeline"]}
                />
                <Line
                  type="monotone" dataKey="value" name="Pipeline"
                  stroke="url(#pipelineGrad)" strokeWidth={2.5}
                  dot={{ fill: chartPrimary, r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: chartAccent }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* ── Charts row 2: Sources + Funnel ── */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">

        {/* Leads by Source */}
        <GlassCard delay={0.3} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Leads by Source</h3>
          <div className="flex-1 min-h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSourceSummary} margin={{ top: 8, right: 20, left: 6, bottom: 14 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} strokeOpacity={0.18} />
                <XAxis dataKey="source" tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} height={28} />
                <YAxis width={34} tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: chartTooltipBackground, border: chartTooltipBorder, borderRadius: "12px", fontSize: "12px" }}
                  labelStyle={{ color: chartTooltipText, fontWeight: 600 }}
                  itemStyle={{ color: chartTooltipText }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="leads" radius={[8, 8, 0, 0]} fill={chartPrimary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Conversion Funnel */}
        <GlassCard delay={0.35} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Conversion Funnel</h3>
          <div className="flex-1 space-y-4 pt-2 pb-10">
            {funnelSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                style={{ originX: 0 }}
              >
                <div className="h-10 flex items-center rounded-xl border border-border/30 bg-muted/10 overflow-hidden">
                  <div
                    className="gradient-primary h-full flex items-center justify-between px-3 transition-all"
                    style={{ width: step.width, minWidth: "fit-content" }}
                  >
                    <span className="text-xs font-medium text-white whitespace-nowrap">{step.label}</span>
                    <span className="text-xs font-bold text-white ml-3">{step.value.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* ── Channel Performance ── */}
      <GlassCard delay={0.38} className="rounded-[28px] border-border/60 bg-card/90 p-7">
        <h3 className="mb-6 text-base font-semibold tracking-[-0.02em] text-foreground">Channel Performance</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channelPerformance.map((ch, i) => (
            <motion.div
              key={ch.channel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.06 }}
              className="flex flex-col gap-5 rounded-3xl border border-border/50 bg-card px-6 py-6 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">{ch.channel}</p>
                  <p className="pt-2 text-[11px] text-muted-foreground">{ch.leads} leads</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>Response</span>
                    <span>{ch.responseRate}%</span>
                  </div>
                  <div className="h-1.5 rounded-full border border-border/60 bg-muted/70 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.responseRate}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.06 }}
                      className="h-full rounded-full"
                      style={{ background: i % 2 === 0 ? chartPrimary : chartAccent }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>Avg Score</span>
                    <span>{ch.avgScore}</span>
                  </div>
                  <div className="h-1.5 rounded-full border border-border/60 bg-muted/70 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.avgScore}%` }}
                      transition={{ duration: 1, delay: 0.55 + i * 0.06 }}
                      className="h-full rounded-full gradient-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* ── AI Insights ── */}
      <div className="py-2">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground tracking-[-0.02em]">AI Insights</h2>
          </div>
          <div className="gradient-accent flex items-center gap-2 rounded-2xl px-3.5 py-2 text-primary-foreground shadow-sm">
            <Brain className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{insights.length} active insights</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {insights.map((insight, i) => {
            const { Icon, badge, iconBg, accent, label, metricClass } = insightStyle[insight.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="group relative flex min-h-80 flex-col overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {/* Subtle accent glow in corner */}
                <div
                  className="absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-5 transition-opacity group-hover:opacity-10"
                  style={{ background: accent }}
                />

                {/* Top row */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`rounded-2xl px-3.5 py-1.5 text-[11px] font-semibold shadow-sm ${badge}`}>{label}</span>
                  </div>
                  <ConfidenceRing value={insight.confidence} color={accent} />
                </div>

                {/* Metric highlight */}
                {insight.metric && (
                  <div className="mb-6">
                    <span className={`text-2xl font-bold tracking-tight ${metricClass}`}>
                      {insight.metric}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">{insight.metricLabel}</span>
                  </div>
                )}

                <h3 className="mb-3.5 mt-1 text-base font-semibold leading-snug text-foreground">{insight.title}</h3>
                <p className="mb-6 text-[11px] leading-5 text-muted-foreground">{insight.description}</p>

                <button
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: "hsl(var(--gradient-end))" }}
                >
                  {insight.action}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom row: Funnel detail + Activity ── */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">

        {/* Recent Activity */}
        <GlassCard delay={0.55} className="h-full rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-6 text-base font-semibold tracking-[-0.02em] text-foreground">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.07 }}
                className="flex items-center gap-4 rounded-3xl border border-border/40 bg-muted/15 px-5 py-5 hover:bg-muted/25 transition-colors"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-lg shadow-primary/10 ${i % 2 === 0 ? "gradient-accent text-primary-foreground" : "gradient-primary text-primary-foreground"}`}>
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground leading-7">{item.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Lead Score Breakdown — top 4 */}
        <GlassCard delay={0.6} className="h-full rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-6 text-base font-semibold tracking-[-0.02em] text-foreground">Top Lead Scores</h3>
          <div className="space-y-5">
            {[
              { name: "Anita Desai",   company: "Desai Group",        score: 91, factors: ["Budget alignment", "Decision maker", "Active engagement"] },
              { name: "Rajesh Mehta",  company: "Vikram Industries",   score: 87, factors: ["Project timeline match", "High budget"] },
              { name: "Suman Reddy",   company: "Reddy Infra",         score: 85, factors: ["Fast-track project", "Multi-channel"] },
              { name: "Priya Shah",    company: "Shah Constructions",  score: 82, factors: ["CXO contact", "Positive sentiment"] },
            ].map((lead, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
                className="rounded-3xl border border-border/50 bg-card px-5 py-5 transition-colors hover:bg-muted/15"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl gradient-primary text-sm font-bold text-primary-foreground">
                    {lead.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-foreground">{lead.name}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{lead.company}</p>
                  </div>
                  <span className="shrink-0 text-2xl font-bold gradient-text">{lead.score}</span>
                </div>
                <div className="mb-4 h-2 rounded-full border border-border/60 bg-muted/70 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lead.score}%` }}
                    transition={{ duration: 1.1, delay: 0.7 + i * 0.08 }}
                    className="h-full rounded-full gradient-primary"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {lead.factors.map(f => (
                    <span key={f} className="rounded-xl border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
