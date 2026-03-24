"use client";

import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import {
  monthlyFunnelData,
  channelDistribution,
  campaignPerformanceChart,
  analyticsMetrics,
} from "@/data/analytics";
import { motion } from "framer-motion";

const chartGridStroke = "hsl(var(--border))";
const chartTickColor = "hsl(var(--muted-foreground))";
const chartTooltipBackground = "hsl(var(--card))";
const chartTooltipBorder = "1px solid hsl(var(--border))";
const chartTooltipText = "hsl(var(--foreground))";
const chartPrimary = "hsl(var(--primary))";
const chartAccent = "hsl(var(--gradient-end))";
const chartSuccess = "hsl(var(--success))";

export default function AnalyticsPage() {
  return (
    <div className="space-y-7 max-w-350 mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((metric, index) => (
          <StatCard
            key={metric.label}
            title={metric.label}
            value={metric.value}
            change={metric.change}
            trend="up"
            icon={metric.icon}
            delay={index * 0.08}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <GlassCard delay={0.2} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Lead Funnel Trend</h3>
          <div className="min-h-75 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFunnelData} margin={{ top: 8, right: 20, left: 6, bottom: 14 }}>
                <defs>
                  <linearGradient id="analyticsLeadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartPrimary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartPrimary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="analyticsQualifiedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartAccent} stopOpacity={0.24} />
                    <stop offset="95%" stopColor={chartAccent} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="analyticsConvertedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartSuccess} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={chartSuccess} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} strokeOpacity={0.18} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} height={28} />
                <YAxis width={34} tick={{ fontSize: 11, fill: chartTickColor }} axisLine={{ stroke: chartGridStroke, strokeOpacity: 0.35 }} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: chartTooltipBackground, border: chartTooltipBorder, borderRadius: "12px", fontSize: "12px" }}
                  labelStyle={{ color: chartTooltipText, fontWeight: 600 }}
                  itemStyle={{ color: chartTooltipText }}
                />
                <Area type="monotone" dataKey="leads" name="Leads" stroke={chartPrimary} fill="url(#analyticsLeadGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="qualified" name="Qualified" stroke={chartAccent} fill="url(#analyticsQualifiedGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="converted" name="Converted" stroke={chartSuccess} fill="url(#analyticsConvertedGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 pl-6">
            {[
              { color: chartPrimary, label: "Leads" },
              { color: chartAccent, label: "Qualified" },
              { color: chartSuccess, label: "Converted" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.25} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Channel Distribution</h3>
          <div className="min-h-75 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="46%"
                  innerRadius={58}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {channelDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: chartTooltipBackground, border: chartTooltipBorder, borderRadius: "12px", fontSize: "12px" }}
                  labelStyle={{ color: chartTooltipText, fontWeight: 600 }}
                  itemStyle={{ color: chartTooltipText }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-3">
            {channelDistribution.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between rounded-2xl border border-border/40 bg-muted/15 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: channel.color }} />
                  <span className="text-sm font-medium text-foreground">{channel.name}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{channel.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <GlassCard delay={0.3} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Campaign Performance</h3>
          <div className="flex-1 space-y-4">
            {campaignPerformanceChart.map((campaign, index) => (
              <motion.div
                key={`${campaign.name}-performance`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 + index * 0.06 }}
                className="rounded-3xl border border-border/50 bg-card px-5 py-5 transition-colors hover:bg-muted/15"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-foreground">{campaign.name}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{campaign.leads} leads generated</p>
                  </div>
                  <span className="shrink-0 rounded-2xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    #{index + 1}
                  </span>
                </div>
                <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Lead volume</span>
                  <span className="font-semibold text-foreground">{campaign.leads}</span>
                </div>
                <div className="mb-4 h-2 overflow-hidden rounded-full border border-border/60 bg-muted/70">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(campaign.leads / campaignPerformanceChart[0].leads) * 100}%` }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.06 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${chartPrimary}, ${chartAccent})` }}
                  />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-muted/15 px-4 py-3">
                  <span className="text-xs text-muted-foreground">Conversion rate</span>
                  <span className="text-sm font-bold gradient-text">{campaign.rate}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard delay={0.35} className="flex h-full min-h-105 flex-col rounded-[28px] border-border/60 bg-card/90 p-7">
          <h3 className="mb-7 text-base font-semibold tracking-[-0.02em] text-foreground">Conversion Breakdown</h3>
          <div className="flex-1 space-y-5 pt-2">
            {campaignPerformanceChart.map((campaign, index) => (
              <motion.div
                key={campaign.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.06 }}
                className="rounded-3xl border border-border/50 bg-card px-5 py-5 transition-colors hover:bg-muted/15"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-foreground">{campaign.name}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{campaign.leads} leads generated</p>
                  </div>
                  <span className="text-2xl font-bold gradient-text">{campaign.rate}%</span>
                </div>
                <div className="mb-4 h-2 overflow-hidden rounded-full border border-border/60 bg-muted/70">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${campaign.rate}%` }}
                    transition={{ duration: 1, delay: 0.45 + index * 0.06 }}
                    className="h-full rounded-full gradient-primary"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Conversion rate</span>
                  <span>{campaign.rate}% of engaged leads</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
