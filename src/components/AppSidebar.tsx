"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Brain,
  Bot,
  Megaphone,
  Calendar,
  BarChart3,
  Settings,
  Zap,
  ChevronLeft,
  GitBranch,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Leads", icon: Users, path: "/leads" },
  { title: "Campaigns", icon: Megaphone, path: "/campaigns" },
  { title: "Calendar", icon: Calendar, path: "/calendar" },
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
  { title: "Omni-Channel", icon: GitBranch, path: "/omni-channel" },
  { title: "AI Insights", icon: Brain, path: "/insights" },
  { title: "AI Chat", icon: Bot, path: "/ai-chat" },
];

type AppSidebarProps = {
  open: boolean;
  onToggle: () => void;
};

export function AppSidebar({ open, onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isSettingsActive = pathname === "/settings";
  const navItemBaseClass =
    "group relative flex items-center overflow-hidden rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring/60";
  const navItemHoverClass =
    "text-muted-foreground hover:bg-muted/25 hover:text-sidebar-foreground";
  const navItemActiveClass =
    "gradient-primary text-primary-foreground shadow-lg shadow-primary/20";

  const handleLogout = () => {
    window.localStorage.removeItem("jindal-auth");
    router.push("/login");
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 280 : 76 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 left-0 z-40 flex h-[calc(100dvh/0.9)] min-h-[calc(100dvh/0.9)] flex-col border-r border-border/50 bg-card/70 backdrop-blur-xl"
    >
      {/* TOP BAR (Logo + Collapse Icon) */}
      <div
        className={cn(
          "flex h-23 items-center border-b border-border/50",
          open ? "gap-3 px-5" : "justify-center px-4"
        )}
      >
        {open && (
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/25">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="block truncate font-semibold text-[15px] text-foreground">
                Jindal
              </span>
            </div>
          </div>
        )}

        {/* COLLAPSE ICON ONLY */}
        <button
          onClick={onToggle}
          className={cn(
            navItemBaseClass,
            navItemHoverClass,
            open
              ? "h-11 w-11 shrink-0 justify-center rounded-xl p-2.5"
              : "w-full justify-center px-0 py-3.5"
          )}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronLeft
            className={cn(
              "relative z-10 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:text-sidebar-foreground",
              !open && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* NAV ITEMS */}
      <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                navItemBaseClass,
                open ? "gap-3.5 px-3.5 py-3.5" : "justify-center px-0 py-3.5",
                isActive ? navItemActiveClass : navItemHoverClass
              )}
            >
              <item.icon
                className={cn(
                  "relative z-10 h-5 w-5 shrink-0 transition-colors duration-200",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-sidebar-foreground"
                )}
              />

              {open && (
                <span className="relative z-10 truncate">{item.title}</span>
              )}
            </Link>
          );
        })}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-auto border-t border-border/50">
        <div className="px-4 py-5">
        <div className="space-y-3">
        {/* SETTINGS */}
        <Link
          href="/settings"
          aria-current={isSettingsActive ? "page" : undefined}
          className={cn(
            navItemBaseClass,
            "px-3.5 py-3.5",
            open ? "gap-3.5" : "justify-center",
            isSettingsActive ? navItemActiveClass : navItemHoverClass
          )}
        >
          <Settings
            className={cn(
              "relative z-10 h-5 w-5 shrink-0 transition-colors duration-200",
              isSettingsActive
                ? "text-primary-foreground"
                : "text-muted-foreground group-hover:text-sidebar-foreground"
            )}
          />
          {open && <span className="relative z-10 truncate">Settings</span>}
        </Link>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "group relative flex w-full items-center overflow-hidden rounded-xl px-3.5 py-3.5 text-sm font-medium text-destructive transition-all duration-200 hover:bg-destructive/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
            open ? "gap-3.5" : "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {open && <span className="relative z-10 truncate font-semibold">Logout</span>}
        </button>
        </div>
        </div>
      </div>
    </motion.aside>
  );
}
