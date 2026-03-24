"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { channelQuickReplies, defaultAIReply } from "@/data/conversations-all-leads";
import type { ChatMessage, LeadConversationData } from "@/data/conversations-all-leads";

interface ChatChannelProps {
  lead: LeadConversationData;
}

export function ChatChannel({ lead }: ChatChannelProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [autoplayDone, setAutoplayDone] = useState(false);
  const [extraMessages, setExtraMessages] = useState<ChatMessage[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setVisibleMessages([]);
    setExtraMessages([]);
    setAutoplayDone(false);
    setIsTyping(false);
    setInput("");
    indexRef.current = 0;

    const messages = lead.chat;

    const playNext = () => {
      const i = indexRef.current;
      if (i >= messages.length) {
        setAutoplayDone(true);
        return;
      }
      const msg = messages[i];
      const delay = msg.role === "ai" ? 1500 : 800;

      if (msg.role === "ai") {
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
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lead.leadId]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleMessages, extraMessages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setExtraMessages((p) => [...p, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setExtraMessages((p) => [
        ...p,
        { id: Date.now() + 1, role: "ai", text: defaultAIReply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1800);
  };

  const allMessages = [...visibleMessages, ...extraMessages];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/50 px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="text-sm font-semibold text-foreground">SmartBuild AI Agent</p>
          <p className="mt-1 truncate text-xs leading-none text-muted-foreground">Active</p>
        </div>
        <div className="ml-auto shrink-0">
          <span className="rounded-lg bg-success/10 px-3 py-1 text-xs font-medium text-success">Score: {lead.score}</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="flex-1 space-y-4 overflow-y-auto bg-muted/10 p-4">
        <AnimatePresence>
          {allMessages.map((msg, i) => (
            <motion.div
              key={msg.id ?? i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${msg.role === "ai" ? "gradient-primary" : "bg-card border border-border/60 text-foreground"}`}>
                  {msg.role === "ai" ? <Bot className="w-3.5 h-3.5 text-primary-foreground" /> : <User className="w-3.5 h-3.5 text-foreground" />}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-md"
                      : "rounded-bl-md border border-border/60 bg-card text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
          {channelQuickReplies.chat.map((r) => (
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
            placeholder="Type a live chat reply..."
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
