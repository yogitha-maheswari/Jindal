"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageSquare, Send, Sparkles, User } from "lucide-react";
import { channelQuickReplies, defaultAIReply, LeadConversationData, OmniMessage } from "@/data/conversations-all-leads";


interface WhatsAppChannelProps {
  lead: LeadConversationData;
}

export function WhatsAppChannel({ lead }: WhatsAppChannelProps) {
  const [visibleMessages, setVisibleMessages] = useState<OmniMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [autoplayDone, setAutoplayDone] = useState(false);
  const [extraMessages, setExtraMessages] = useState<OmniMessage[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Reset and replay whenever lead changes
  useEffect(() => {
    setVisibleMessages([]);
    setExtraMessages([]);
    setAutoplayDone(false);
    setIsTyping(false);
    setInput("");
    indexRef.current = 0;

    const messages = lead.whatsapp;

    const playNext = () => {
      const i = indexRef.current;
      if (i >= messages.length) {
        setAutoplayDone(true);
        return;
      }
      const msg = messages[i];
      const delay = msg.isAI ? 1400 : 700;

      if (msg.isAI) {
        setIsTyping(true);
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, msg]);
          indexRef.current += 1;
          timeoutRef.current = setTimeout(playNext, 400);
        }, delay);
      } else {
        timeoutRef.current = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, msg]);
          indexRef.current += 1;
          timeoutRef.current = setTimeout(playNext, 300);
        }, delay);
      }
    };

    timeoutRef.current = setTimeout(playNext, 500);
    return () => clearTimeout(timeoutRef.current);
  }, [lead.leadId]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleMessages, extraMessages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: OmniMessage = { from: lead.leadName, text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setExtraMessages((p) => [...p, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setExtraMessages((p) => [...p, { from: "AI Agent", text: defaultAIReply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isAI: true }]);
    }, 1800);
  };

  const allMessages = [...visibleMessages, ...extraMessages];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/50 px-4 py-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(142,70%,45%)" }}>
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="text-sm font-semibold text-foreground">WhatsApp AI Agent</p>
          <p className="mt-1 truncate text-xs leading-none text-muted-foreground">Active</p>
        </div>
        <div className="ml-auto shrink-0">
          <span className="rounded-lg bg-success/10 px-3 py-1 text-xs font-medium text-success">Score: {lead.score}</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="flex-1 space-y-4 overflow-y-auto bg-muted/10 p-4">
        <AnimatePresence>
          {allMessages.map((msg, i) => {
            const isAI = msg.isAI;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${isAI ? "justify-start" : "justify-end"}`}
              >
                <div className={`flex items-end gap-2 max-w-[78%] ${isAI ? "" : "flex-row-reverse"}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${isAI ? "gradient-primary" : "bg-card border border-border/60 text-foreground"}`}>
                    {isAI ? <Bot className="w-3.5 h-3.5 text-primary-foreground" /> : <User className="w-3.5 h-3.5 text-foreground" />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      isAI ? "rounded-bl-md border border-border/60 bg-card text-foreground" : "rounded-br-md gradient-primary text-primary-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${isAI ? "text-muted-foreground" : "text-primary-foreground/60"}`}>{msg.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary">
              <Bot className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/60 bg-card px-4 py-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary typing-dot-1" />
              <span className="w-2 h-2 rounded-full bg-primary typing-dot-2" />
              <span className="w-2 h-2 rounded-full bg-primary typing-dot-3" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick replies */}
      {autoplayDone && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {channelQuickReplies.whatsapp.map((r) => (
            <button key={r} onClick={() => setInput(r)} className="px-3 py-1.5 rounded-xl border border-primary/30 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
              <Sparkles className="w-3 h-3 inline mr-1" />{r}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Reply on WhatsApp..."
            className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={handleSend} className="p-3 rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
