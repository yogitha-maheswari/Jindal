"use client";

import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Search, ChevronRight, X, Brain, Users, Target, TrendingUp, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  leads,
  type Lead,
} from "@/data/leads";
import { cn } from "@/lib/utils";

// ── KPIs derived live from leads[] ────────────────────────────────────────────

const totalLeads       = leads.length;
const highValueLeads   = leads.filter((l) => l.status === "High").length;
const avgScore         = Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length);
const qualifiedRate    = Math.round((highValueLeads / totalLeads) * 100);

const leadKPIs = [
  {
    title: "Total Leads",
    value: String(totalLeads),
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
    delay: 0,
  },
  {
    title: "High-Value Leads",
    value: String(highValueLeads),
    change: "+8.2%",
    trend: "up" as const,
    icon: Star,
    delay: 0.08,
  },
  {
    title: "Avg Lead Score",
    value: String(avgScore),
    change: "+4.1%",
    trend: "up" as const,
    icon: Target,
    delay: 0.16,
  },
  {
    title: "High-Value Rate",
    value: `${qualifiedRate}%`,
    change: "+2.3%",
    trend: "up" as const,
    icon: TrendingUp,
    delay: 0.24,
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = leads.filter(
    (l) =>
      (statusFilter === "All" || l.status === statusFilter) &&
      (l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-350 mx-auto">

      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
        </div>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leadKPIs.map((kpi) => (
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

      {/* ── Table + Detail Panel ── */}
      <div className="flex gap-6">

        {/* Table */}
        <GlassCard
          className="min-w-0 flex-1 overflow-hidden rounded-[28px] border-border/60 bg-card/90 p-0"
          delay={0.32}
        >
          {/* Search + filter bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-border/50 px-5 py-4 xl:flex-nowrap">
            <div className="relative min-w-65 flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="h-11 w-full rounded-2xl border border-border/50 bg-card/50 py-2 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex w-full items-center gap-2 rounded-2xl border border-border/50 bg-card/40 p-1 sm:w-auto">
              {["All", "High", "Medium", "Low"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    "flex-1 rounded-xl px-4 py-2 text-center text-xs font-semibold tracking-[0.01em] transition-all sm:flex-none",
                    statusFilter === s
                      ? "gradient-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="scrollbar-hidden overflow-x-auto">
            <table className="w-full table-fixed" style={{ minWidth: "860px" }}>
              <colgroup>
                <col style={{ width: "22%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "17%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "9%"  }} />
                <col style={{ width: "3%"  }} />
              </colgroup>
              <thead>
                <tr className="border-b border-border/50">
                  {["Name", "Company", "Role", "Budget", "Source", "Score", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/90"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  return (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedLead(lead)}
                      className={cn(
                        "group cursor-pointer border-b border-border/30 transition-all",
                        selectedLead?.id === lead.id ? "bg-primary/6" : "hover:bg-muted/20"
                      )}
                    >
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-[11px] font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                            {lead.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="block text-[13px] font-semibold text-foreground">{lead.name}</span>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="px-5 py-4">
                        <div className="text-[13px] font-medium text-foreground">{lead.company}</div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <div className="text-[13px] text-muted-foreground">{lead.role}</div>
                      </td>

                      {/* Budget */}
                      <td className="px-5 py-4">
                        <div className="text-[13px] font-semibold text-foreground">{lead.budget}</div>
                      </td>

                      {/* Source */}
                      <td className="px-5 py-4">
                        <span className="text-[12px] font-medium text-foreground">{lead.source}</span>
                      </td>

                      {/* Score */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-16 overflow-hidden rounded-full border border-border/60 bg-muted/70">
                            <div
                              className="h-full rounded-full gradient-primary"
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                          <span className="min-w-8 text-[13px] font-semibold text-foreground">{lead.score}</span>
                        </div>
                      </td>

                      {/* Chevron */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-card/40 text-muted-foreground transition-all group-hover:border-border/70 group-hover:bg-muted/30 group-hover:text-foreground">
                            <ChevronRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* ── Detail Panel ── */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 380 }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="shrink-0"
            >
              <GlassCard className="sticky top-6 h-fit rounded-[28px] border-border/60 bg-card/90 p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Lead Details</h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/40 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Avatar card */}
                <div className="mb-6 rounded-3xl border border-border/40 bg-muted/15 px-5 py-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl gradient-primary text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                    {selectedLead.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">{selectedLead.name}</h4>
                  <p className="mt-3 text-[13px] text-muted-foreground">
                    {selectedLead.role} • {selectedLead.company}
                  </p>
                  {/* Inline score pill */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full border border-border/60 bg-muted/70">
                      <div
                        className="h-full rounded-full gradient-primary"
                        style={{ width: `${selectedLead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground">{selectedLead.score}</span>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                  </div>
                </div>

                {/* Info rows */}
                <div className="mb-6 space-y-2">
                  {[
                    { label: "Project",      value: selectedLead.project     },
                    { label: "Budget",       value: selectedLead.budget      },
                    { label: "Last Contact", value: selectedLead.lastContact },
                    { label: "Channel",      value: selectedLead.channel     },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3 text-sm"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span className="truncate text-right font-medium text-foreground">{value}</span>
                    </div>
                  ))}

                  {/* Status row */}
                  <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="truncate text-right font-medium text-foreground">{selectedLead.status}</span>
                  </div>

                  {/* Source row */}
                  <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3 text-sm">
                    <span className="text-muted-foreground">Source</span>
                    <span className="truncate text-right font-medium text-foreground">{selectedLead.source}</span>
                  </div>
                </div>

                {/* AI insight */}
                <div className="mb-5 rounded-3xl border border-border/50 bg-muted/15 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-lg shadow-primary/20">
                      <Brain className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">AI Insight</span>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/40 px-4 py-4">
                    <p className="text-[12px] leading-6 text-muted-foreground">
                      This lead has a{" "}
                      <span className="font-semibold text-primary">{selectedLead.score}% conversion probability</span>{" "}
                      based on budget alignment, engagement patterns, and project timeline. Recommend
                      scheduling a follow-up within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 rounded-2xl gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity hover:opacity-90">
                    Engage Lead
                  </button>
                  <button className="flex-1 rounded-2xl border border-border/60 bg-card/50 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/40">
                    Escalate
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
