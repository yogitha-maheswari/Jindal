// ─── ANALYTICS DATA ────────────────────────────────────────────────────────────
// Charts, trends, and KPI data used on the Analytics page.

import { Clock, Target, TrendingUp, Users } from "lucide-react";

// Monthly funnel trend — AreaChart on Analytics page
export const monthlyFunnelData = [
  { month: "Jan", leads: 180, qualified: 72,  converted: 28 },
  { month: "Feb", leads: 220, qualified: 95,  converted: 38 },
  { month: "Mar", leads: 280, qualified: 130, converted: 52 },
  { month: "Apr", leads: 310, qualified: 155, converted: 68 },
  { month: "May", leads: 350, qualified: 180, converted: 78 },
  { month: "Jun", leads: 420, qualified: 215, converted: 95 },
];

// Channel distribution — PieChart / donut on Analytics page
export const channelDistribution = [
  { name: "WhatsApp", value: 35, color: "hsl(var(--success))" },
  { name: "Email",    value: 25, color: "hsl(var(--primary))" },
  { name: "Chat",     value: 22, color: "hsl(var(--gradient-end))" },
  { name: "Voice",    value: 18, color: "hsl(var(--gradient-accent))" },
];

// Campaign performance (horizontal bar) — Analytics page
export const campaignPerformanceChart = [
  { name: "Precast Solutions",    leads: 156, rate: 42 },
  { name: "Green Building",       leads: 134, rate: 38 },
  { name: "Industrial",           leads: 98,  rate: 35 },
  { name: "Residential",          leads: 87,  rate: 31 },
  { name: "Infrastructure",       leads: 65,  rate: 28 },
];

// KPI metric cards — Analytics page
export const analyticsMetrics = [
  {
    label: "Avg Response Time",
    value: "1.2s",
    subtext: "AI-powered instant responses",
    icon: Clock,
    change: "-0.3s",
  },
  {
    label: "Conversion Rate",
    value: "36.5%",
    subtext: "Up from 28.1% last quarter",
    icon: Target,
    change: "+8.4%",
  },
  {
    label: "Active Campaigns",
    value: "12",
    subtext: "5 high-performing",
    icon: TrendingUp,
    change: "+3",
  },
  {
    label: "Monthly Leads",
    value: "420",
    subtext: "Record high this month",
    icon: Users,
    change: "+20%",
  },
];
