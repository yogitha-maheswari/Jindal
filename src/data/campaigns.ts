// ─── CAMPAIGNS DATA ────────────────────────────────────────────────────────────
// Central source of truth for all campaign-related data used across the app.

export type CampaignStatus = "Active" | "Paused";
export type CampaignPerformance = "high" | "medium" | "low";

export interface Campaign {
  name: string;
  status: CampaignStatus;
  leads: number;
  conversion: number;
  budget: string;
  channels: string[];
  performance: CampaignPerformance;
}

export const campaigns: Campaign[] = [
  {
    name: "Precast Solutions Q1",
    status: "Active",
    leads: 156,
    conversion: 42,
    budget: "₹2.5L",
    channels: ["WhatsApp", "Email"],
    performance: "high",
  },
  {
    name: "Green Building Initiative",
    status: "Active",
    leads: 134,
    conversion: 38,
    budget: "₹1.8L",
    channels: ["Chat", "Email"],
    performance: "high",
  },
  {
    name: "Industrial Solutions",
    status: "Active",
    leads: 98,
    conversion: 35,
    budget: "₹1.2L",
    channels: ["Voice", "WhatsApp"],
    performance: "medium",
  },
  {
    name: "Residential Projects",
    status: "Paused",
    leads: 87,
    conversion: 31,
    budget: "₹2.0L",
    channels: ["Email"],
    performance: "low",
  },
  {
    name: "Infrastructure Outreach",
    status: "Active",
    leads: 65,
    conversion: 28,
    budget: "₹0.8L",
    channels: ["Chat", "Voice"],
    performance: "medium",
  },
];

// Utility: performance badge color classes
export const campaignPerformanceColors: Record<CampaignPerformance, string> = {
  high: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  low: "bg-destructive/10 text-destructive",
};

// Summary stats derived from campaigns — used in Campaigns page header cards
export const campaignSummary = {
  active: campaigns.filter((c) => c.status === "Active").length,
  totalLeads: campaigns.reduce((sum, c) => sum + c.leads, 0),
  avgConversion:
    Math.round(
      (campaigns.reduce((sum, c) => sum + c.conversion, 0) / campaigns.length) * 10
    ) / 10,
};