// ─── AI CHAT DATA ──────────────────────────────────────────────────────────────
// Builds the RAG system prompt from all app data and provides chat history types.

import { leads, leadScores }         from "@/data/leads";
import { campaigns, campaignSummary } from "@/data/campaigns";
import { analyticsMetrics, channelDistribution, monthlyFunnelData } from "@/data/analytics";
import { insights }                   from "@/data/insights";
import { getCalendarSnapshot }        from "@/data/calendar";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

// ── RAG Context ────────────────────────────────────────────────────────────────
// Serialises all live app data into a compact but rich context block.
// This is injected as the system prompt so the AI answers questions about
// the CRM data accurately and in real time.

export function buildSystemPrompt(): string {
  const { todaysMeetings } = getCalendarSnapshot();

  const leadsContext = leads
    .map(
      (l) =>
        `• ${l.name} (${l.role}, ${l.company}) — Budget: ${l.budget}, Status: ${l.status}, Score: ${l.score}/100, Source: ${l.source}, Channel: ${l.channel}, Project: ${l.project}, Last contact: ${l.lastContact}`
    )
    .join("\n");

  const campaignsContext = campaigns
    .map(
      (c) =>
        `• ${c.name} — Status: ${c.status}, Leads: ${c.leads}, Conversion: ${c.conversion}%, Budget: ${c.budget}, Channels: ${c.channels.join(", ")}, Performance: ${c.performance}`
    )
    .join("\n");

  const insightsContext = insights
    .map(
      (i) =>
        `• [${i.type.toUpperCase()}] ${i.title} — ${i.description} (Confidence: ${i.confidence}%)`
    )
    .join("\n");

  const meetingsContext = todaysMeetings
    .map((m) => `• ${m.time}: ${m.title} with ${m.attendee} (${m.type}, ${m.duration})`)
    .join("\n");

  const topLeadsContext = leadScores
    .map((l) => `• ${l.name} (${l.company}) — Score: ${l.score}, Factors: ${l.factors.join(", ")}`)
    .join("\n");

  const analyticsContext = analyticsMetrics
    .map((m) => `• ${m.label}: ${m.value} (${m.change})`)
    .join("\n");

  const channelContext = channelDistribution
    .map((c) => `• ${c.name}: ${c.value}%`)
    .join("\n");

  const pipelineContext = monthlyFunnelData
    .map((d) => `${d.month}: ${d.leads} leads → ${d.qualified} qualified → ${d.converted} converted`)
    .join(" | ");

  return `You are SmartBuild AI, an intelligent CRM assistant embedded in a lead management platform for a construction materials company (Jindal Steel / SmartBuild). You have real-time access to the following live CRM data. Answer all questions accurately based on this data. Be concise, professional, and insightful. Use ₹ for Indian currency. When relevant, surface actionable recommendations.

━━━ LIVE CRM SNAPSHOT ━━━

📋 LEADS (${leads.length} total, ${leads.filter((l) => l.status === "High").length} high-value):
${leadsContext}

🏆 TOP AI-SCORED LEADS:
${topLeadsContext}

📢 CAMPAIGNS (${campaignSummary.active} active / ${campaigns.length} total):
${campaignsContext}
— Total leads generated: ${campaignSummary.totalLeads} | Avg conversion: ${campaignSummary.avgConversion}%

🧠 AI INSIGHTS:
${insightsContext}

📅 TODAY'S MEETINGS:
${meetingsContext}

📊 ANALYTICS KPIs:
${analyticsContext}

📡 CHANNEL DISTRIBUTION:
${channelContext}

📈 MONTHLY PIPELINE (leads → qualified → converted):
${pipelineContext}

━━━ INSTRUCTIONS ━━━
- Answer questions about leads, campaigns, performance, analytics, and meetings using the data above.
- If asked to compare, rank, or summarise, use the actual numbers.
- If asked something outside the CRM data scope, answer helpfully from general knowledge but note it's not from live data.
- Keep responses focused and formatted clearly. Use bullet points or tables for structured data.
- Always address the user as a sales/marketing professional.`;
}

// ── Suggested starter questions ───────────────────────────────────────────────

export const suggestedQuestions = [
  "Which leads should I follow up with today?",
  "What's our best performing campaign right now?",
  "Show me a summary of high-value leads",
  "Which channel is generating the most leads?",
  "What AI insights should I act on first?",
  "Who are the top leads by score?",
  "What meetings do I have today?",
  "How is our monthly pipeline trending?",
];

// ── localStorage helpers ───────────────────────────────────────────────────────

const STORAGE_KEY = "smartbuild_chat_sessions";

export function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: ChatSession[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // quota exceeded — silently fail
  }
}

export function createSession(firstMessage?: string): ChatSession {
  return {
    id: `session_${Date.now()}`,
    title: firstMessage
      ? firstMessage.slice(0, 48) + (firstMessage.length > 48 ? "…" : "")
      : "New conversation",
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
