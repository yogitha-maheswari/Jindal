"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Send, Plus, Bot, User, Sparkles, Trash2,
  MessageSquare, ChevronRight, Loader2, Copy, Check, ChevronLeft,
} from "lucide-react";
import {
  buildSystemPrompt,
  loadSessions,
  saveSessions,
  createSession,
  generateMessageId,
  suggestedQuestions,
  type ChatSession,
  type ChatMessage,
} from "@/data/aiChat";

// ── Markdown-lite renderer ─────────────────────────────────────────────────────
// Turns **bold**, bullet points, and code ticks into styled spans without a dep.

function renderContent(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      // Inline code
      return part.split(/(`[^`]+`)/g).map((p, k) => {
        if (p.startsWith("`") && p.endsWith("`")) {
          return (
            <code key={k} className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] text-primary">
              {p.slice(1, -1)}
            </code>
          );
        }
        return p;
      });
    });

    // Bullet lines
    if (line.trimStart().startsWith("• ") || line.trimStart().startsWith("- ")) {
      return (
        <li key={i} className="ml-4 list-none flex gap-2 items-start">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
          <span>{parts}</span>
        </li>
      );
    }

    // Horizontal rule
    if (line.startsWith("━")) {
      return <hr key={i} className="my-3 border-border/40" />;
    }

    // Empty line → spacing
    if (line.trim() === "") return <div key={i} className="h-2" />;

    return <p key={i} className="leading-7">{parts}</p>;
  });
}

// ── Copy button ────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="rounded-lg p-1.5 text-muted-foreground/60 transition-colors hover:bg-muted/50 hover:text-muted-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-primary/60"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AiChatPage() {
  const [sessions, setSessions]         = useState<ChatSession[]>([]);
  const [activeId, setActiveId]         = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput]               = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [streamText, setStreamText]     = useState("");
  const messagesEndRef                  = useRef<HTMLDivElement>(null);
  const textareaRef                     = useRef<HTMLTextAreaElement>(null);
  const systemPrompt                    = useRef(buildSystemPrompt());

  // ── Load history ──────────────────────────────────────────────────────────

  useEffect(() => {
    const stored = loadSessions();
    setSessions(stored);
    if (stored.length > 0) setActiveId(stored[0].id);
  }, []);

  // ── Persist on change ─────────────────────────────────────────────────────

  useEffect(() => {
    if (sessions.length > 0) saveSessions(sessions);
  }, [sessions]);

  // ── Auto-scroll ───────────────────────────────────────────────────────────

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, streamText, isLoading]);

  // ── Auto-resize textarea ──────────────────────────────────────────────────

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  // ── Active session ────────────────────────────────────────────────────────

  const activeSession = sessions.find((s) => s.id === activeId) ?? null;

  // ── New chat ──────────────────────────────────────────────────────────────

  const newChat = useCallback(() => {
    const session = createSession();
    setSessions((prev) => [session, ...prev]);
    setActiveId(session.id);
    setInput("");
  }, []);

  // ── Delete session ────────────────────────────────────────────────────────

  const deleteSession = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  // ── Send message ──────────────────────────────────────────────────────────

  const send = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    setInput("");

    // Create session if none active
    let sessionId = activeId;
    setSessions((prev) => {
      if (!sessionId || !prev.find((s) => s.id === sessionId)) {
        const s = createSession(content);
        sessionId = s.id;
        setActiveId(s.id);
        return [s, ...prev];
      }
      return prev;
    });

    // User message
    const userMsg: ChatMessage = {
      id: generateMessageId(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              title: s.messages.length === 0 ? content.slice(0, 48) : s.title,
              messages: [...s.messages, userMsg],
              updatedAt: Date.now(),
            }
          : s
      )
    );

    setIsLoading(true);
    setStreamText("");

    // Build message history for API
    const history = (sessions.find((s) => s.id === sessionId)?.messages ?? []).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: systemPrompt.current,
          messages: [...history, { role: "user", content }],
        }),
      });

      const data = await response.json();
      const reply: string =
        data?.content?.[0]?.text ?? "I'm sorry, I couldn't generate a response. Please try again.";

      // Simulate streaming by revealing char by char
      let i = 0;
      const interval = setInterval(() => {
        i += Math.floor(Math.random() * 6) + 3;
        setStreamText(reply.slice(0, i));
        if (i >= reply.length) {
          clearInterval(interval);
          setStreamText("");
          const assistantMsg: ChatMessage = {
            id: generateMessageId(),
            role: "assistant",
            content: reply,
            timestamp: Date.now(),
          };
          setSessions((prev) =>
            prev.map((s) =>
              s.id === sessionId
                ? { ...s, messages: [...s.messages, assistantMsg], updatedAt: Date.now() }
                : s
            )
          );
          setIsLoading(false);
        }
      }, 18);
    } catch {
      setStreamText("");
      setIsLoading(false);
      const errMsg: ChatMessage = {
        id: generateMessageId(),
        role: "assistant",
        content: "I encountered an error connecting to the AI. Please check your connection and try again.",
        timestamp: Date.now(),
      };
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? { ...s, messages: [...s.messages, errMsg], updatedAt: Date.now() }
            : s
        )
      );
    }
  }, [input, isLoading, activeId, sessions]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const messages = activeSession?.messages ?? [];
  const isEmpty  = messages.length === 0 && !isLoading;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-400 mx-auto overflow-hidden rounded-[28px] border border-border/60 bg-card/90">

      {/* ── Sidebar ── */}
      <motion.div
        initial={false}
        animate={{
          width: isSidebarOpen ? 288 : 48,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="flex shrink-0 flex-col overflow-hidden border-r border-border/50 bg-card/50"
      >
        {isSidebarOpen && (
          <>
            {/* Header */}
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-border/50 px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">Jindal AI</span>
              </div>
              <button
                onClick={newChat}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/50 bg-card/50 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Sessions list */}
            <div className="scrollbar-hidden flex-1 overflow-y-auto px-3 py-3">
              {sessions.length === 0 ? (
                <p className="px-3 py-6 text-center text-xs text-muted-foreground/60">
                  No conversations yet.
                  <br />Start a new chat above.
                </p>
              ) : (
                sessions.map((s, index) => (
                  <div
                    key={s.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveId(s.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveId(s.id);
                      }
                    }}
                    className={cn(
                      "group relative flex w-full items-center gap-3 border-border/50 px-3 py-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                      index !== sessions.length - 1 && "border-b",
                      activeId === s.id
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                    )}
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                    <span className="flex-1 truncate text-[12px] font-medium">{s.title}</span>
                    <button
                      onClick={(e) => deleteSession(s.id, e)}
                      className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-lg text-muted-foreground/50 transition-colors hover:bg-destructive/10 hover:text-destructive group-hover:flex"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                    {activeId === s.id && (
                      <ChevronRight className="h-3 w-3 shrink-0 text-primary/60" />
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        <div
          className={cn(
            "flex min-h-21.25 shrink-0 items-center border-t border-border/50 p-4",
            isSidebarOpen ? "justify-end" : "justify-center"
          )}
        >
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label={isSidebarOpen ? "Collapse chat sidebar" : "Expand chat sidebar"}
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <motion.span
              animate={{ rotate: isSidebarOpen ? 0 : 180 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.span>
          </button>
        </div>
      </motion.div>

      {/* ── Main chat area ── */}
      <div className="flex min-w-0 min-h-0 flex-1 flex-col">

        {/* Chat header */}
        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-border/50 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-sm font-semibold text-foreground">
              {activeSession?.title ?? "New Conversation"}
            </p>
            <p className="mt-1 truncate text-xs leading-none text-muted-foreground">Active</p>
          </div>
        </div>

        {/* Messages */}
        <div className="scrollbar-hidden min-h-0 flex-1 space-y-4 overflow-y-auto bg-muted/10 p-4">
          <AnimatePresence>

            {/* Empty state */}
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-100 flex-col items-center justify-center px-2 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/25">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="mb-1 text-sm font-semibold text-foreground">Ask anything</h2>
                <p className="mb-6 max-w-md text-[11px] leading-5 text-muted-foreground">
                  I know your leads, campaigns, pipeline performance, and AI insights.
                </p>
                <div className="grid w-full max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 text-left text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                    >
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/60 transition-colors group-hover:text-primary" />
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Message bubbles */}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div className={cn("flex max-w-[80%] items-end gap-2", msg.role === "user" ? "flex-row-reverse" : "")}>
                  {msg.role === "assistant" && (
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-primary">
                      <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                      msg.role === "user"
                        ? "rounded-br-md gradient-primary text-primary-foreground"
                        : "rounded-bl-md border border-border/60 bg-card text-foreground"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-1 text-[13px] leading-7">
                        {renderContent(msg.content)}
                      </div>
                    ) : (
                      <p className="whitespace-pre-line text-[13px] leading-6">{msg.content}</p>
                    )}

                    <div
                      className={cn(
                        "mt-1 flex items-center gap-1.5 text-[10px]",
                        msg.role === "user" ? "justify-end text-primary-foreground/60" : "text-muted-foreground"
                      )}
                    >
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      {msg.role === "assistant" && <CopyButton text={msg.content} />}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card text-foreground">
                      <User className="h-3.5 w-3.5 text-foreground" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Streaming / loading */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/60 bg-card px-4 py-3 text-sm text-foreground shadow-sm">
                  {streamText ? (
                    <div className="space-y-1 text-[13px] leading-7">
                      {renderContent(streamText)}
                      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse align-middle bg-primary" />
                    </div>
                  ) : (
                    <TypingDots />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-border/50 p-4">
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about your leads, campaigns, analytics…"
              rows={1}
              className="min-h-13 flex-1 resize-none rounded-xl border border-border/50 bg-muted/50 px-4 py-3 text-sm leading-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              style={{ maxHeight: "160px" }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || isLoading}
              className={cn(
                "rounded-xl p-3 transition-opacity",
                input.trim() && !isLoading
                  ? "gradient-primary text-primary-foreground hover:opacity-90"
                  : "cursor-not-allowed bg-muted/40 text-muted-foreground/40"
              )}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
