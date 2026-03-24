// ─── LEADS DATA ────────────────────────────────────────────────────────────────
// Central source of truth for all lead-related data used across the app.

import { MessageSquare, Mail, Phone, Instagram, Facebook } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

export type LeadStatus  = "High" | "Medium" | "Low";
export type LeadSource  =
  | "WhatsApp"
  | "Instagram"
  | "Facebook"
  | "Email"
  | "Web"
  | "Voice"
  | "LinkedIn";
export type LeadChannel = "Chat" | "Voice" | "WhatsApp" | "Email";

export interface Lead {
  id: number;
  name: string;
  company: string;
  role: string;
  budget: string;
  status: LeadStatus;
  score: number;
  lastContact: string;
  /** source — the platform / channel where this lead was originally generated */
  source: LeadSource;
  /** channel — the active communication channel currently being used */
  channel: LeadChannel;
  project: string;
}

export interface LeadScore {
  name: string;
  company: string;
  score: number;
  factors: string[];
}

export interface LeadSourceSummary {
  source: LeadSource;
  leads: number;
}

// ── Leads ──────────────────────────────────────────────────────────────────────

export const leads: Lead[] = [
  {
    id: 1,
    name: "Rajesh Mehta",
    company: "Vikram Industries",
    role: "CEO",
    budget: "₹25-30 Cr",
    status: "High",
    score: 87,
    lastContact: "2 min ago",
    source: "LinkedIn",
    channel: "Chat",
    project: "Commercial Complex - Pune",
  },
  {
    id: 2,
    name: "Priya Shah",
    company: "Shah Constructions",
    role: "MD",
    budget: "₹15-20 Cr",
    status: "High",
    score: 82,
    lastContact: "8 min ago",
    source: "Instagram",
    channel: "Voice",
    project: "Residential Tower - Mumbai",
  },
  {
    id: 3,
    name: "Arjun Patel",
    company: "Patel Infrastructure",
    role: "VP Operations",
    budget: "₹10-12 Cr",
    status: "Medium",
    score: 65,
    lastContact: "1 hour ago",
    source: "WhatsApp",
    channel: "WhatsApp",
    project: "Industrial Warehouse - Ahmedabad",
  },
  {
    id: 4,
    name: "Suresh Kumar",
    company: "Kumar Builders",
    role: "CTO",
    budget: "₹8-10 Cr",
    status: "Medium",
    score: 58,
    lastContact: "3 hours ago",
    source: "Email",
    channel: "Email",
    project: "School Building - Delhi",
  },
  {
    id: 5,
    name: "Anita Desai",
    company: "Desai Group",
    role: "CFO",
    budget: "₹40-50 Cr",
    status: "High",
    score: 91,
    lastContact: "15 min ago",
    source: "Facebook",
    channel: "Chat",
    project: "Township - Bangalore",
  },
  {
    id: 6,
    name: "Vikram Singh",
    company: "Singh & Co",
    role: "Director",
    budget: "₹5-7 Cr",
    status: "Low",
    score: 34,
    lastContact: "2 days ago",
    source: "Web",
    channel: "Email",
    project: "Retail Space - Jaipur",
  },
  {
    id: 7,
    name: "Neha Gupta",
    company: "Gupta Realty",
    role: "CEO",
    budget: "₹20-25 Cr",
    status: "High",
    score: 79,
    lastContact: "30 min ago",
    source: "WhatsApp",
    channel: "WhatsApp",
    project: "IT Park - Hyderabad",
  },
  {
    id: 8,
    name: "Deepak Nair",
    company: "Nair Constructions",
    role: "MD",
    budget: "₹12-15 Cr",
    status: "Medium",
    score: 72,
    lastContact: "45 min ago",
    source: "Instagram",
    channel: "Chat",
    project: "Luxury Villas - Kochi",
  },
  {
    id: 9,
    name: "Suman Reddy",
    company: "Reddy Infra",
    role: "CEO",
    budget: "₹30-35 Cr",
    status: "High",
    score: 85,
    lastContact: "20 min ago",
    source: "Facebook",
    channel: "Voice",
    project: "SEZ Development - Vizag",
  },
  {
    id: 10,
    name: "Kavya Iyer",
    company: "Iyer Developers",
    role: "Director",
    budget: "₹6-8 Cr",
    status: "Low",
    score: 41,
    lastContact: "1 day ago",
    source: "LinkedIn",
    channel: "Email",
    project: "Retail Strip - Chennai",
  },
];

// ── Derived: source summary ────────────────────────────────────────────────────
// Aggregated lead count per source — consumed by the Dashboard bar chart.
// Stays in sync automatically whenever leads[] changes.

export const leadSourceSummary: LeadSourceSummary[] = (() => {
  const tally = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.source] = (acc[lead.source] ?? 0) + 1;
    return acc;
  }, {});

  return (Object.entries(tally) as [LeadSource, number][])
    .map(([source, count]) => ({ source, leads: count }))
    .sort((a, b) => b.leads - a.leads);
})();

// ── Top AI-scored leads ────────────────────────────────────────────────────────
// Used on the Insights page.

export const leadScores: LeadScore[] = [
  {
    name: "Anita Desai",
    company: "Desai Group",
    score: 91,
    factors: ["Budget alignment", "Decision maker", "Active engagement"],
  },
  {
    name: "Rajesh Mehta",
    company: "Vikram Industries",
    score: 87,
    factors: ["Project timeline match", "Repeat inquiry", "High budget"],
  },
  {
    name: "Priya Shah",
    company: "Shah Constructions",
    score: 82,
    factors: ["CXO contact", "Voice call completed", "Positive sentiment"],
  },
  {
    name: "Neha Gupta",
    company: "Gupta Realty",
    score: 79,
    factors: ["Engagement", "Budget fit", "Growing interest"],
  },
];

// ── Utility maps ───────────────────────────────────────────────────────────────

export const leadStatusColors: Record<LeadStatus, string> = {
  High:   "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  Low:    "bg-muted text-muted-foreground",
};

/** Brand-accurate colours for each lead source */
export const leadSourceColors: Record<LeadSource, string> = {
  WhatsApp:  "hsl(142, 70%, 45%)",
  Instagram: "hsl(340, 80%, 55%)",
  Facebook:  "hsl(221, 80%, 58%)",
  Email:     "hsl(245, 58%, 51%)",
  Web:       "hsl(200, 80%, 55%)",
  Voice:     "hsl(280, 60%, 55%)",
  LinkedIn:  "hsl(207, 90%, 45%)",
};

export const leadChannelIcons: Record<LeadChannel, typeof MessageSquare> = {
  Chat:     MessageSquare,
  Voice:    Phone,
  WhatsApp: MessageSquare,
  Email:    Mail,
};

export const leadSourceIcons: Record<LeadSource, typeof MessageSquare> = {
  WhatsApp:  MessageSquare,
  Instagram: Instagram,
  Facebook:  Facebook,
  Email:     Mail,
  Web:       MessageSquare,
  Voice:     Phone,
  LinkedIn:  MessageSquare,
};