"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { MessageSquare, Mail, Phone, Bot, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { allLeadConversations, leadConversationMap } from "@/data/conversations-all-leads";
import { WhatsAppChannel } from "@/components/channels/WhatsAppChannel";
import { EmailChannel } from "@/components/channels/EmailChannel";
import { ChatChannel } from "@/components/channels/ChatChannel";
import { VoiceChannel } from "@/components/channels/VoiceChannel";

type ChannelId = "whatsapp" | "email" | "chat" | "voice";

interface ChannelTab {
  id: ChannelId;
  label: string;
  icon: typeof MessageSquare;
  color: string;
}

const channelTabs: ChannelTab[] = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare, color: "hsl(142,70%,45%)" },
  { id: "email", label: "Email", icon: Mail, color: "hsl(245,58%,51%)" },
  { id: "chat", label: "Chat", icon: Bot, color: "hsl(var(--primary))" },
  { id: "voice", label: "Voice", icon: Phone, color: "hsl(280,60%,55%)" },
];

const scoreColor = (score: number) =>
  score >= 80 ? "bg-success/10 text-success" : score >= 55 ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground";

export default function OmniChannelPage() {
  const [selectedLeadId, setSelectedLeadId] = useState<number>(allLeadConversations[0].leadId);
  const [activeChannel, setActiveChannel] = useState<ChannelId>("whatsapp");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLead = leadConversationMap[selectedLeadId];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleLeadSelect = (leadId: number) => {
    setSelectedLeadId(leadId);
    setDropdownOpen(false);
    setActiveChannel("whatsapp");
  };

  return (
    <div className="mx-auto max-w-350 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Omni-Channel View</h1>
      </div>

      <GlassCard
        delay={0.05}
        className="relative z-20 isolate rounded-4xl border-border/60 bg-[hsl(var(--card))] px-5 py-5 shadow-none"
      >
        <div className="flex flex-wrap items-center gap-4 xl:flex-nowrap">
          <div ref={dropdownRef} className="relative min-w-115 flex-1 xl:max-w-175 xl:flex-none">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex w-full items-center gap-3 rounded-3xl border border-border/50 bg-[hsl(var(--card))] px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl gradient-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
                {selectedLead.leadInitials}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="grid grid-cols-[minmax(0,120px)_minmax(0,170px)_auto] items-center gap-3">
                  <span className="truncate text-sm font-semibold text-foreground">{selectedLead.leadName}</span>
                  <span className="truncate text-sm font-medium text-muted-foreground">{selectedLead.company}</span>
                  <span className="truncate text-sm text-muted-foreground">{selectedLead.role}</span>
                </div>
              </div>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", dropdownOpen && "rotate-180")} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full z-60 mt-3 w-full min-w-140 overflow-hidden rounded-3xl border border-border/60 bg-[hsl(var(--card))] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="scrollbar-hidden max-h-96 space-y-1 overflow-y-auto p-3">
                  {allLeadConversations.map((lead) => (
                    <button
                      key={lead.leadId}
                      onClick={() => handleLeadSelect(lead.leadId)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors",
                        selectedLeadId === lead.leadId
                          ? "border-primary/30 bg-primary/8 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.12)]"
                          : "border-transparent hover:bg-muted/40"
                      )}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-primary text-xs font-bold text-primary-foreground">
                        {lead.leadInitials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="grid grid-cols-[minmax(0,120px)_minmax(0,170px)_auto] items-center gap-3">
                          <span className="truncate text-sm font-semibold text-foreground">{lead.leadName}</span>
                          <span className="truncate text-sm font-medium text-muted-foreground">{lead.company}</span>
                          <span className="truncate text-sm text-muted-foreground">{lead.role}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className={cn("rounded-lg px-2 py-0.5 text-xs font-bold", scoreColor(lead.score))}>
                          {lead.score}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="ml-auto xl:text-right">
            <span className={cn("rounded-full px-4 py-1.5 text-xs font-bold", scoreColor(selectedLead.score))}>
              Score: {selectedLead.score}
            </span>
          </div>
        </div>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        {channelTabs.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setActiveChannel(id)}
            className={cn(
              "inline-flex w-35 items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all",
              activeChannel === id
                ? "border-transparent text-white shadow-lg"
                : "border-border/50 bg-card/50 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
            )}
            style={activeChannel === id ? { background: color, boxShadow: `0 8px 24px ${color}40` } : {}}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {activeChannel === "voice" ? (
        <GlassCard delay={0.15} className="overflow-hidden rounded-[28px] border-border/60 bg-card/90 p-0">
          <VoiceChannel key={`${selectedLeadId}-voice`} lead={selectedLead} />
        </GlassCard>
      ) : (
        <GlassCard
          delay={0.15}
          className="flex min-h-150 flex-col overflow-hidden rounded-[28px] border-border/60 bg-card/90 p-0"
        >
          {activeChannel === "whatsapp" && <WhatsAppChannel key={`${selectedLeadId}-whatsapp`} lead={selectedLead} />}
          {activeChannel === "email" && <EmailChannel key={`${selectedLeadId}-email`} lead={selectedLead} />}
          {activeChannel === "chat" && <ChatChannel key={`${selectedLeadId}-chat`} lead={selectedLead} />}
        </GlassCard>
      )}
    </div>
  );
}
