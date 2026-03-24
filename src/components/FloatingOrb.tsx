"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bot, Send, X, Maximize2, Sparkles, User, Loader2, Plus,
} from "lucide-react";
import {
  buildSystemPrompt,
  generateMessageId,
  type ChatMessage,
} from "@/data/aiChat";

// ── Typing dots ────────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary/60"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// ── Suggested chips (mini) ────────────────────────────────────────────────────

const miniSuggestions = [
  "Top leads today",
  "Best campaign?",
  "Pipeline summary",
  "High-value leads",
];

// ─────────────────────────────────────────────────────────────────────────────

export function FloatingOrb() {
  const router                          = useRouter();
  const pathname                        = usePathname();
  const [isOpen, setIsOpen]             = useState(false);
  const [messages, setMessages]         = useState<ChatMessage[]>([]);
  const [input, setInput]               = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [streamText, setStreamText]     = useState("");
  const [dragBounds, setDragBounds]     = useState({ left: -9999, right: 0, top: -9999, bottom: 0 });
  const messagesEndRef                  = useRef<HTMLDivElement>(null);
  const inputRef                        = useRef<HTMLInputElement>(null);
  const systemPrompt                    = useRef(buildSystemPrompt());
  const dragControls                    = useDragControls();
  const didDragRef                      = useRef(false);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    const updateDragBounds = () => {
      const orbSize = 56;
      const margin = 24;
      setDragBounds({
        left: -(window.innerWidth - orbSize - margin * 2),
        right: 0,
        top: -(window.innerHeight - orbSize - margin * 2),
        bottom: 0,
      });
    };

    updateDragBounds();
    window.addEventListener("resize", updateDragBounds);
    return () => window.removeEventListener("resize", updateDragBounds);
  }, []);

  // ── Send ────────────────────────────────────────────────────────────────────

  const send = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    setInput("");

    const userMsg: ChatMessage = {
      id: generateMessageId(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setStreamText("");

    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 512,
          system: systemPrompt.current,
          messages: history,
        }),
      });

      const data  = await response.json();
      const reply: string =
        data?.content?.[0]?.text ?? "Sorry, I couldn't get a response. Please try again.";

      // Simulated streaming
      let i = 0;
      const interval = setInterval(() => {
        i += Math.floor(Math.random() * 6) + 3;
        setStreamText(reply.slice(0, i));
        if (i >= reply.length) {
          clearInterval(interval);
          setStreamText("");
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              role: "assistant",
              content: reply,
              timestamp: Date.now(),
            },
          ]);
          setIsLoading(false);
        }
      }, 18);
    } catch {
      setStreamText("");
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          role: "assistant",
          content: "Connection error. Please try again.",
          timestamp: Date.now(),
        },
      ]);
    }
  }, [input, isLoading, messages]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); send(); }
  };

  const resetChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setStreamText("");
  }, []);

  // ── Expand to full page ─────────────────────────────────────────────────────

  const expandToPage = () => {
    setIsOpen(false);
    router.push("/ai-chat");
  };

  const closePanel = () => {
    resetChat();
    setIsOpen(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────

  if (pathname?.startsWith("/ai-chat")) {
    return null;
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragBounds}
      onDragStart={() => {
        didDragRef.current = false;
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 3 || Math.abs(info.offset.y) > 3) {
          didDragRef.current = true;
          window.setTimeout(() => {
            didDragRef.current = false;
          }, 0);
        }
      }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >

      {/* ── Floating chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="flex w-92.5 flex-col overflow-hidden rounded-3xl border border-border/70 bg-[hsl(var(--card))] shadow-2xl shadow-black/30"
            style={{ height: "520px" }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 border-b border-border/60 bg-[hsl(var(--card))] px-4 py-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary shadow-md shadow-primary/25">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-sm font-semibold text-foreground">Jindal AI</p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={resetChat}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary"
                    title="Start new chat"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={expandToPage}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary"
                  title="Open full view"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={closePanel}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground/70 transition-colors hover:bg-muted/50 hover:text-foreground"
                  title="Close and clear"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="scrollbar-hidden flex-1 space-y-3 overflow-y-auto bg-muted/10 px-4 py-4">

              {/* Empty state */}
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center px-2">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/25">
                    <Sparkles className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <p className="mb-1 text-sm font-semibold text-foreground">Ask anything</p>
                  <p className="mb-6 whitespace-nowrap text-[10px] text-muted-foreground">
                    I know your leads, campaigns, analytics & AI insights.
                  </p>
                  <div className="flex w-full flex-wrap justify-center gap-2.5">
                    {miniSuggestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="inline-flex min-w-38 items-center justify-center rounded-2xl border border-border/60 bg-card px-3.5 py-2.5 text-[11px] font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg gradient-primary mt-0.5">
                      <Bot className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-5",
                      msg.role === "user"
                        ? "gradient-primary text-primary-foreground rounded-tr-sm"
                        : "rounded-tl-sm border border-border/60 bg-card text-foreground shadow-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card">
                      <User className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Streaming / typing */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg gradient-primary mt-0.5">
                    <Bot className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-border/60 bg-card px-3.5 py-2.5 text-[12px] leading-5 text-foreground shadow-sm">
                    {streamText ? (
                      <>
                        {streamText}
                        <span className="inline-block h-3.5 w-0.5 animate-pulse bg-primary ml-0.5 align-middle" />
                      </>
                    ) : (
                      <TypingDots />
                    )}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/60 bg-[hsl(var(--card))] px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 transition-colors focus-within:border-primary/40">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about your CRM data…"
                  className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all",
                    input.trim() && !isLoading
                      ? "gradient-primary text-primary-foreground hover:opacity-90"
                      : "bg-muted/40 text-muted-foreground/40 cursor-not-allowed"
                  )}
                >
                  {isLoading
                    ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    : <Send className="h-3.5 w-3.5" />
                  }
                </button>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={expandToPage}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 text-[10px] text-muted-foreground/60 hover:text-primary transition-colors"
                >
                  <Maximize2 className="h-3 w-3" />
                  Open full view with history
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Orb button ── */}
      <button
        onPointerDown={(event) => dragControls.start(event)}
        onClick={() => {
          if (didDragRef.current) return;
          setIsOpen((v) => !v);
        }}
        className="relative flex h-14 w-14 cursor-grab items-center justify-center active:cursor-grabbing"
        aria-label="Open AI Chat"
      >
        {/* Pulse rings */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
            <span
              className="absolute -inset-1.25 rounded-full border border-primary/20"
              style={{ animation: "pulse-ring 2.5s ease-out infinite" }}
            />
          </>
        )}

        {/* Core orb */}
        <motion.div
          animate={isOpen ? { scale: 0.92 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-xl shadow-primary/40"
        >
          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-white/10" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5 text-primary-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="h-5 w-5 text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Unread dot — show when panel closed and has messages */}
        {!isOpen && messages.length > 0 && (
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[9px] font-bold text-white shadow-md">
            {messages.filter((m) => m.role === "assistant").length}
          </span>
        )}
      </button>
    </motion.div>
  );
}
