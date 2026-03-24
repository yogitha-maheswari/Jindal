"use client";

import { Search, Bell, Moon, Sun, Menu, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface TopNavbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function TopNavbar({ onMenuClick, sidebarOpen }: TopNavbarProps) {
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleDark = () => {
    setDarkMode((prev) => {
      const next = !prev;

      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return next;
    });
  };

  return (
    <header className="relative z-20 h-23 border-b border-border/40 bg-card/35 px-4 backdrop-blur-xl sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 left-1/4 h-24 w-24 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute right-10 top-0 h-20 w-20 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-xl border border-border/50 bg-card/40 p-2.5 text-muted-foreground transition-all hover:border-border hover:bg-muted/60 hover:text-foreground lg:hidden"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="min-w-0 flex-1 lg:flex-none"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl gradient-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25">
                RJ
              </div>

              <div className="inline-flex h-11 min-w-0 items-center rounded-2xl border border-border/40 bg-card/40 px-4 backdrop-blur-sm">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">
                    Rajesh Jindal
                  </p>
                  <span className="inline-flex shrink-0 items-center rounded-full gradient-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-lg shadow-primary/20">
                    CXO
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <label className="group relative flex h-11 min-w-0 flex-1 items-center rounded-2xl border border-border/50 bg-card/45 px-3 shadow-sm backdrop-blur-sm transition-all hover:border-border hover:bg-card/60 sm:min-w-[320px] lg:flex-none">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Search leads, conversations, campaigns..."
                className="h-full w-full bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground/90 focus:outline-none"
              />
              <span className="hidden rounded-lg border border-border/50 bg-background/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:inline-flex">
                /
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleDark}
                className="group rounded-xl border border-border/50 bg-card/40 p-2.5 backdrop-blur-sm transition-all hover:border-border hover:bg-muted/60"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                ) : (
                  <Moon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                )}
              </button>

              <button
                onClick={() => router.push("/settings?section=notifications")}
                className="group relative rounded-xl border border-border/50 bg-card/40 p-2.5 backdrop-blur-sm transition-all hover:border-border hover:bg-muted/60"
                aria-label="Open notification settings"
              >
                <Bell className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-card gradient-primary" />
              </button>

              <button className="hidden rounded-xl gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:shadow-primary/40 md:inline-flex md:items-center md:gap-1.5">
                New Campaign
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
