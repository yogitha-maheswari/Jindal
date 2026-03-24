"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, ChevronRight, Megaphone, Play, TrendingUp, Users, X } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { cn } from "@/lib/utils";
import {
  campaigns,
  campaignPerformanceColors,
  campaignSummary,
  type Campaign,
} from "@/data/campaigns";

const campaignKPIs = [
  {
    title: "Active Campaigns",
    value: String(campaignSummary.active),
    change: "+9.4%",
    trend: "up" as const,
    icon: Play,
    delay: 0,
  },
  {
    title: "Total Leads Generated",
    value: String(campaignSummary.totalLeads),
    change: "+14.1%",
    trend: "up" as const,
    icon: Users,
    delay: 0.08,
  },
  {
    title: "Avg Conversion",
    value: `${campaignSummary.avgConversion}%`,
    change: "+3.8%",
    trend: "up" as const,
    icon: TrendingUp,
    delay: 0.16,
  },
];

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(campaigns[0] ?? null);

  return (
    <div className="max-w-350 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
        </div>
        <button className="flex items-center gap-2 rounded-xl gradient-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
          <Megaphone className="h-4 w-4" /> New Campaign
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {campaignKPIs.map((kpi) => (
          <StatCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
            delay={kpi.delay}
          />
        ))}
      </div>

      <div className="flex gap-6">
        <GlassCard
          className="min-w-0 flex-1 overflow-hidden rounded-[28px] border-border/60 bg-card/90 p-0"
          delay={0.24}
        >
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">All Campaigns</h3>
            </div>
          </div>

          <div className="scrollbar-hidden overflow-x-auto">
            <table className="w-full table-fixed" style={{ minWidth: "900px" }}>
              <colgroup>
                <col style={{ width: "27%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "3%" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-border/50">
                  {["Campaign", "Status", "Leads", "Conversion", "Budget", "Channels", "Impact", ""].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/90"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <motion.tr
                    key={campaign.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCampaign(campaign)}
                    className={cn(
                      "group cursor-pointer border-b border-border/30 transition-all",
                      selectedCampaign?.name === campaign.name ? "bg-primary/6" : "hover:bg-muted/20"
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-[11px] font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                          {campaign.name
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <span className="block truncate text-[13px] font-semibold text-foreground">
                            {campaign.name}
                          </span>
                          <span className="mt-1 block text-[11px] text-muted-foreground">
                            Multi-channel outreach
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "rounded-xl px-2.5 py-1 text-[11px] font-semibold",
                          campaign.status === "Active"
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-[13px] font-semibold text-foreground">{campaign.leads}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-16 overflow-hidden rounded-full border border-border/60 bg-muted/70">
                          <div
                            className="h-full rounded-full gradient-primary"
                            style={{ width: `${campaign.conversion}%` }}
                          />
                        </div>
                        <span className="min-w-9 text-[13px] font-semibold text-foreground">
                          {campaign.conversion}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 pr-2">
                      <div className="text-[13px] font-semibold text-foreground">{campaign.budget}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col items-start gap-1.5">
                        {campaign.channels.map((channel) => (
                          <span
                            key={channel}
                            className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "rounded-xl px-2.5 py-1 text-[11px] font-semibold capitalize",
                          campaignPerformanceColors[campaign.performance]
                        )}
                      >
                        {campaign.performance}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-card/40 text-muted-foreground transition-all group-hover:border-border/70 group-hover:bg-muted/30 group-hover:text-foreground">
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <AnimatePresence>
          {selectedCampaign && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 380 }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="shrink-0"
            >
              <GlassCard className="sticky top-6 h-fit rounded-[28px] border-border/60 bg-card/90 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    Campaign Details
                  </h3>
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/40 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-6 rounded-3xl border border-border/40 bg-muted/15 px-5 py-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl gradient-primary text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                    {selectedCampaign.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">{selectedCampaign.name}</h4>
                  <p className="mt-3 text-[13px] text-muted-foreground">
                    {selectedCampaign.channels.join(" • ")} • {selectedCampaign.status}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full border border-border/60 bg-muted/70">
                      <div
                        className="h-full rounded-full gradient-primary"
                        style={{ width: `${selectedCampaign.conversion}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground">{selectedCampaign.conversion}%</span>
                    <span className="text-xs text-muted-foreground">conversion</span>
                  </div>
                </div>

                <div className="mb-6 space-y-2">
                  {[
                    { label: "Status", value: selectedCampaign.status },
                    { label: "Leads", value: String(selectedCampaign.leads) },
                    { label: "Budget", value: selectedCampaign.budget },
                    { label: "Channels", value: selectedCampaign.channels.join(", ") },
                    { label: "Performance", value: selectedCampaign.performance },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3 text-sm"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span className="truncate text-right font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-5 rounded-3xl border border-border/50 bg-muted/15 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-lg shadow-primary/20">
                      <Brain className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">AI Insight</span>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/40 px-4 py-4">
                    <p className="text-[12px] leading-6 text-muted-foreground">
                      This campaign is showing a{" "}
                      <span className="font-semibold text-primary">
                        {selectedCampaign.performance} performance trend
                      </span>{" "}
                      with {selectedCampaign.conversion}% conversion across {selectedCampaign.channels.length} active
                      channels. Prioritize the strongest channel mix and scale budget gradually.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 rounded-2xl gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity hover:opacity-90">
                    Optimize Campaign
                  </button>
                  <button className="flex-1 rounded-2xl border border-border/60 bg-card/50 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/40">
                    View Analytics
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
