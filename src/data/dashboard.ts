// ─── DASHBOARD DATA (extended with AI Insights) ───────────────────────────────

import {
  Users, MessageSquare, TrendingUp, Zap,
  Brain, BarChart3, Target, Clock,
  PhoneCall, Mail, Bot, Star,
} from "lucide-react";

// ── Stat cards ─────────────────────────────────────────────────────────────────

export const dashboardStats = [
  { title: "Total Leads",        value: "248",   change: "+12%", trend: "up"   as const, icon: Users,         delay: 0.05 },
  { title: "Active Convos",      value: "34",    change: "+8%",  trend: "up"   as const, icon: MessageSquare, delay: 0.10 },
  { title: "Conversion Rate",    value: "18.4%", change: "+3.2%",trend: "up"   as const, icon: TrendingUp,    delay: 0.15 },
  { title: "AI Response Rate",   value: "99.1%", change: "-0.2%",trend: "down" as const, icon: Zap,           delay: 0.20 },
];

// ── Weekly engagement ──────────────────────────────────────────────────────────

export const weeklyEngagementData = [
  { name: "Mon", leads: 18, qualified: 8,  converted: 3 },
  { name: "Tue", leads: 24, qualified: 14, converted: 5 },
  { name: "Wed", leads: 31, qualified: 18, converted: 7 },
  { name: "Thu", leads: 22, qualified: 11, converted: 4 },
  { name: "Fri", leads: 38, qualified: 22, converted: 9 },
  { name: "Sat", leads: 15, qualified: 7,  converted: 2 },
  { name: "Sun", leads: 10, qualified: 4,  converted: 1 },
];

// ── Monthly pipeline ───────────────────────────────────────────────────────────

export const monthlyPipelineData = [
  { month: "Sep", value: 48  },
  { month: "Oct", value: 62  },
  { month: "Nov", value: 55  },
  { month: "Dec", value: 78  },
  { month: "Jan", value: 91  },
  { month: "Feb", value: 104 },
  { month: "Mar", value: 127 },
];

// ── Conversion funnel ──────────────────────────────────────────────────────────

export const funnelSteps = [
  { label: "Leads Captured",    value: 248, width: "100%", gradient: "linear-gradient(90deg, hsl(245,58%,51%), hsl(280,60%,55%))" },
  { label: "AI Qualified",      value: 182, width: "73%",  gradient: "linear-gradient(90deg, hsl(260,65%,52%), hsl(290,62%,56%))" },
  { label: "Meeting Scheduled", value: 94,  width: "50%",  gradient: "linear-gradient(90deg, hsl(275,68%,54%), hsl(300,64%,57%))" },
  { label: "Proposal Sent",     value: 47,  width: "32%",  gradient: "linear-gradient(90deg, hsl(285,70%,55%), hsl(310,65%,58%))" },
  { label: "Closed Won",        value: 18,  width: "18%",  gradient: "linear-gradient(90deg, hsl(300,72%,56%), hsl(320,67%,59%))" },
];

// ── Channel performance ────────────────────────────────────────────────────────

export const channelPerformance = [
  { channel: "WhatsApp", leads: 68,  responseRate: 91, avgScore: 74, icon: MessageSquare, color: "hsl(142,70%,45%)" },
  { channel: "LinkedIn",  leads: 54,  responseRate: 78, avgScore: 81, icon: Users,         color: "hsl(207,90%,45%)" },
  { channel: "Instagram", leads: 47,  responseRate: 83, avgScore: 66, icon: Star,          color: "hsl(340,80%,55%)" },
  { channel: "Email",     leads: 42,  responseRate: 61, avgScore: 58, icon: Mail,          color: "hsl(245,58%,51%)" },
  { channel: "Voice",     leads: 23,  responseRate: 95, avgScore: 87, icon: PhoneCall,     color: "hsl(280,60%,55%)" },
  { channel: "Web Chat",  leads: 14,  responseRate: 88, avgScore: 71, icon: Bot,           color: "hsl(200,80%,55%)" },
];

// ── Recent activity ────────────────────────────────────────────────────────────

export const recentActivity = [
  { icon: Zap,         text: "Anita Desai (Desai Group) scored 91 — flagged for priority follow-up",  time: "2 min ago"   },
  { icon: MessageSquare, text: "New WhatsApp lead: Rajesh Mehta, Vikram Industries — ₹25 Cr project", time: "8 min ago"   },
  { icon: PhoneCall,   text: "AI voice call completed with Priya Shah — sentiment: Positive",          time: "15 min ago"  },
  { icon: Brain,       text: "AI Insight: Maharashtra cluster potential ₹85 Cr identified",            time: "22 min ago"  },
  { icon: Mail,        text: "Proposal auto-sent to Suman Reddy — Vizag SEZ, ₹31-34 Cr",              time: "38 min ago"  },
  { icon: Target,      text: "Conversion milestone: 18 leads closed this month (+24% vs last)",        time: "1 hour ago"  },
];

// ── AI Insights ────────────────────────────────────────────────────────────────

export type InsightType = "opportunity" | "timing" | "alert";

export interface Insight {
  title: string;
  description: string;
  confidence: number;
  type: InsightType;
  action: string;
  metric?: string;
  metricLabel?: string;
}

export const insights: Insight[] = [
  {
    title: "High-Value Lead Cluster",
    description:
      "5 leads from Maharashtra's construction sector showing identical engagement patterns — site visits, budget alignment, and seismic-zone questions. Combined pipeline: ₹85 Cr.",
    confidence: 92,
    type: "opportunity",
    action: "View Cluster",
    metric: "₹85 Cr",
    metricLabel: "Pipeline",
  },
  {
    title: "Optimal Contact Window",
    description:
      "CXO-level contacts respond 73% more often between 10:00–11:30 AM IST. Scheduling AI outreach in this window could add 14 qualified meetings/week.",
    confidence: 88,
    type: "timing",
    action: "Apply Schedule",
    metric: "+73%",
    metricLabel: "Response Rate",
  },
  {
    title: "Campaign Underperforming",
    description:
      "'Residential Solutions' campaign is 18% below benchmark engagement. AI suggests refreshing the CTA with project-timeline urgency framing.",
    confidence: 76,
    type: "alert",
    action: "Review Campaign",
    metric: "-18%",
    metricLabel: "vs Benchmark",
  },
  {
    title: "Green Building Cross-sell",
    description:
      "12 existing clients referenced sustainability in conversations. AI recommends a targeted green-building campaign — estimated ₹22 Cr cross-sell opportunity.",
    confidence: 84,
    type: "opportunity",
    action: "Explore",
    metric: "₹22 Cr",
    metricLabel: "Cross-sell",
  },
  {
    title: "Voice Channel Outperforming",
    description:
      "Voice calls close 2.4× faster than chat for leads scoring above 80. Shifting 30% of high-score leads to voice could improve close rate by an estimated 11%.",
    confidence: 89,
    type: "opportunity",
    action: "Shift Strategy",
    metric: "2.4×",
    metricLabel: "Faster Close",
  },
  {
    title: "Follow-up Lag Detected",
    description:
      "6 leads have gone >48 hrs without a touchpoint after an initial positive response. AI auto-follow-up is disabled for these — re-enable to recover estimated ₹18 Cr.",
    confidence: 81,
    type: "alert",
    action: "Re-enable AI",
    metric: "6 Leads",
    metricLabel: "At Risk",
  },
];

// ── AI performance metrics ─────────────────────────────────────────────────────

export const aiMetrics = [
  { label: "Avg Response Time", value: "< 4s",  sub: "across all channels",    icon: Clock    },
  { label: "Leads AI-Handled",  value: "91%",   sub: "without human handoff",  icon: Bot      },
  { label: "Sentiment Positive",value: "78%",   sub: "of all conversations",   icon: TrendingUp },
  { label: "Meetings Booked",   value: "94",    sub: "by AI this month",       icon: Target   },
];