// ─── INSIGHTS DATA ─────────────────────────────────────────────────────────────
// AI-generated insights and lead score breakdowns used on the Insights page.

export type InsightType = "opportunity" | "timing" | "alert";

export interface Insight {
  title: string;
  description: string;
  confidence: number;
  type: InsightType;
  action: string;
}

export const insights: Insight[] = [
  {
    title: "High-Value Lead Cluster Detected",
    description:
      "5 leads from Maharashtra construction sector showing similar engagement patterns. Combined potential: ₹85 Cr.",
    confidence: 92,
    type: "opportunity",
    action: "View Cluster",
  },
  {
    title: "Optimal Contact Window",
    description:
      "Data shows 73% higher response rates between 10:00-11:30 AM IST for CXO-level contacts.",
    confidence: 88,
    type: "timing",
    action: "Apply Schedule",
  },
  {
    title: "Campaign Underperforming",
    description:
      "'Residential Solutions' campaign has 18% lower engagement vs benchmark. AI recommends content refresh.",
    confidence: 76,
    type: "alert",
    action: "Review Campaign",
  },
  {
    title: "Cross-sell Opportunity",
    description:
      "12 existing clients showing interest in green building solutions based on conversation analysis.",
    confidence: 84,
    type: "opportunity",
    action: "Explore",
  },
];