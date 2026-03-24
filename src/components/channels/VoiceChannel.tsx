"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, PhoneOff, UserCheck, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadConversationData } from "@/data/conversations-all-leads";

interface VoiceChannelProps {
  lead: LeadConversationData;
}

const WAVEFORM = [36, 20, 34, 26, 30, 22, 18, 16, 14, 18, 20, 24, 28, 32, 44, 22, 30, 26, 32, 24];

export function VoiceChannel({ lead }: VoiceChannelProps) {
  const [isActive, setIsActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Reset when lead changes
  useEffect(() => {
    setIsActive(true);
    setIsMuted(false);
    setVisibleLines(0);
    setElapsed(0);
    clearInterval(timerRef.current);

    const lines = lead.voice;
    let lineIndex = 0;

    const showNextLine = () => {
      if (lineIndex < lines.length) {
        setVisibleLines(lineIndex + 1);
        lineIndex++;
        timerRef.current = setTimeout(showNextLine, 3200) as unknown as ReturnType<typeof setInterval>;
      }
    };

    timerRef.current = setTimeout(showNextLine, 1000) as unknown as ReturnType<typeof setInterval>;

    // elapsed timer
    const clock = setInterval(() => setElapsed((p) => p + 1), 1000);

    return () => {
      clearTimeout(timerRef.current as unknown as ReturnType<typeof setTimeout>);
      clearInterval(clock);
    };
  }, [lead.leadId]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleLines]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="grid grid-cols-1 items-start gap-4 p-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      {/* Call card */}
      <div className="flex h-140 max-h-140 flex-col items-center rounded-3xl border border-border/60 bg-card/90 px-6 pt-20 pb-8 text-center lg:sticky lg:top-4">
        {/* Avatar + rings */}
        <div className="relative mb-12 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-22 w-22 items-center justify-center rounded-full gradient-primary shadow-[0_18px_42px_hsl(var(--glass-shadow))]">
              <span className="text-2xl font-bold text-primary-foreground">{lead.leadInitials}</span>
            </div>
          </div>
          {isActive && (
            <>
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-ring" />
              <div className="absolute -inset-3 rounded-full border border-primary/15 animate-pulse-ring" style={{ animationDelay: "0.55s" }} />
              <div className="absolute -inset-6 rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: "1.1s" }} />
            </>
          )}
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-foreground">{lead.leadName}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{lead.role} • {lead.company}</p>

        <div className="mt-5 flex items-center gap-2">
          <span className={cn("h-2.5 w-2.5 rounded-full", isActive ? "bg-success animate-pulse" : "bg-muted-foreground")} />
          <span className="text-xs text-muted-foreground">
            {isActive ? `AI Calling... ${formatTime(elapsed)}` : "Call Ended"}
          </span>
        </div>

        {/* Waveform */}
        {isActive && (
          <div className="mt-10 flex h-12 items-end justify-center gap-1">
            {WAVEFORM.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [Math.max(8, h - 14), Math.max(12, h - 6), Math.max(8, h - 12)] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                className="w-1 rounded-full gradient-primary"
              />
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="mt-10 flex items-start justify-center gap-4">
          {[
            {
              key: "mute",
              label: "Mute",
              Icon: isMuted ? MicOff : Mic,
              cls: isMuted ? "bg-destructive/15 text-destructive" : "border-border/60 bg-card text-foreground hover:bg-muted/30",
              onClick: () => setIsMuted((p) => !p),
            },
            {
              key: "end",
              label: "End Call",
              Icon: PhoneOff,
              cls: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              onClick: () => setIsActive(false),
            },
            {
              key: "transfer",
              label: "Transfer",
              Icon: UserCheck,
              cls: "bg-success/20 text-success hover:bg-success/30",
              onClick: () => {},
            },
          ].map(({ key, label, Icon, cls, onClick }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <button onClick={onClick} className={`rounded-[18px] border p-3.5 shadow-sm transition-colors ${cls}`}>
                <Icon className="h-4.5 w-4.5" />
              </button>
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript card */}
      <div className="flex h-140 max-h-140 flex-col rounded-3xl border border-border/60 bg-card/90 p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Volume2 className="h-4 w-4 text-primary" /> Live Transcript
        </h3>
        <div ref={transcriptRef} className="scrollbar-hidden flex-1 space-y-4 overflow-y-auto pr-1">
          {lead.voice.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-3"
            >
              <span className="pt-1 text-[10px] text-muted-foreground">{line.time}</span>
              <div className="space-y-1">
                <span
                  className="text-[11px] font-bold tracking-wide"
                  style={{ color: line.speaker === "AI" ? "hsl(var(--gradient-end))" : "hsl(var(--gradient-accent))" }}
                >
                  {line.speaker === "AI" ? "AI Agent" : line.speaker}
                </span>
                <p className="text-[13px] leading-7 text-foreground">{line.text}</p>
              </div>
            </motion.div>
          ))}

          {visibleLines < lead.voice.length && visibleLines > 0 && (
            <div className="flex items-center gap-1.5 pl-11">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
