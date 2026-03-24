"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  User, Bell, Shield, Palette, Globe, Zap,
  ChevronRight, Check, X, Eye, EyeOff,
  Smartphone, Monitor, Trash2, Plus, Upload,
  Moon, Sun, Layout, Type, ToggleLeft,
  Mail, Phone, Building, Camera, Save,
  Lock, Key, AlertTriangle, Clock, Wifi,
  Sliders, Bot, Brain, MessageSquare, Target,
  RefreshCw, ExternalLink, Info, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

type SectionId = "profile" | "notifications" | "security" | "appearance" | "integrations" | "ai";

// ─── Toggle component ──────────────────────────────────────────────────────────

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-all duration-300 focus:outline-none",
        enabled
          ? "gradient-primary border-transparent shadow-lg shadow-primary/20"
          : "border-border/60 bg-muted/50 shadow-inner"
      )}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-1 h-4 w-4 rounded-full bg-white shadow-md",
          !enabled && "ring-1 ring-border/50"
        )}
      />
    </button>
  );
}

// ─── Row component (label + value or toggle) ───────────────────────────────────

function SettingRow({
  label, sub, value, children, border = true,
}: {
  label: string; sub?: string; value?: string; children?: React.ReactNode; border?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-6 py-4", border && "border-b border-border/30 last:border-0")}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {value && <span className="text-sm font-semibold text-foreground shrink-0">{value}</span>}
      {children}
    </div>
  );
}

// ─── Section card wrapper ──────────────────────────────────────────────────────

function SectionCard({
  title, subtitle, icon: Icon, children, delay = 0,
}: {
  title: string; subtitle?: string; icon: React.ElementType; children: React.ReactNode; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="rounded-3xl border border-border/60 bg-card/90 overflow-hidden"
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/40">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="px-6 pb-5">{children}</div>
    </motion.div>
  );
}

// ─── Input field ───────────────────────────────────────────────────────────────

function Field({
  label, defaultValue, type = "text", icon: Icon,
}: {
  label: string; defaultValue: string; type?: string; icon?: React.ElementType;
}) {
  const [val, setVal] = useState(defaultValue);
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
        <input
          type={isPassword && !show ? "password" : "text"}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className={cn(
            "w-full rounded-xl border border-border/50 bg-card/60 text-sm text-foreground shadow-inner shadow-black/10 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all py-2.5 pr-4",
            Icon ? "pl-9" : "pl-4"
          )}
        />
        {isPassword && (
          <button
            onClick={() => setShow((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Badge ──────────────────────────────────────────────────────────────────────

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "muted" }) {
  const cls = {
    default: "gradient-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20",
    success: "gradient-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20",
    warning: "gradient-accent text-primary-foreground border-transparent shadow-lg shadow-primary/15",
    muted:   "bg-muted/60 text-muted-foreground border-border/40",
  }[variant];
  return (
    <span className={cn("inline-flex min-w-28 justify-center rounded-xl border px-3 py-1.5 text-center text-xs font-semibold", cls)}>{children}</span>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Section: Profile ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function ProfileSection() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5">
      {/* Avatar */}
      <SectionCard title="Profile Photo" subtitle="Your public identity across the workspace" icon={Camera} delay={0.05}>
        <div className="flex items-center gap-5 pt-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              RJ
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-card border border-border/60 flex items-center justify-center hover:bg-muted/40 transition-colors">
              <Camera className="w-3.5 h-3.5 text-foreground" />
            </button>
          </div>
          <div className="space-y-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
              <Upload className="w-3.5 h-3.5" /> Upload photo
            </button>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF · Max 2 MB</p>
          </div>
        </div>
      </SectionCard>

      {/* Personal info */}
      <SectionCard title="Personal Information" subtitle="Name, role, and contact details" icon={User} delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Field label="First name"    defaultValue="Rajesh"                    icon={User}     />
          <Field label="Last name"     defaultValue="Jindal"                    icon={User}     />
          <Field label="Email address" defaultValue="rajesh@jindalsmartbuild.com" icon={Mail}   />
          <Field label="Phone number"  defaultValue="+91 98765 43210"           icon={Phone}    />
          <Field label="Job title"     defaultValue="Chief Experience Officer"  icon={Star}     />
          <Field label="Company"       defaultValue="Jindal SmartBuild"         icon={Building} />
        </div>
      </SectionCard>

      {/* Workspace */}
      <SectionCard title="Workspace Details" subtitle="Plan and team information" icon={Building} delay={0.15}>
        <div className="pt-2 space-y-0">
          <SettingRow label="Workspace type" value="Enterprise" />
          <SettingRow label="Plan" sub="Renews Jan 2026">
            <Badge variant="default">Enterprise Plan</Badge>
          </SettingRow>
          <SettingRow label="Active users" value="24 members" />
          <SettingRow label="Region" value="India West" />
          <SettingRow label="Account status" border={false}>
            <Badge variant="success">Active</Badge>
          </SettingRow>
        </div>
      </SectionCard>

      {/* Save */}
      <motion.button
        onClick={handleSave}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <AnimatePresence mode="wait">
          {saved
            ? <motion.span key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Check className="w-4 h-4" /> Saved!</motion.span>
            : <motion.span key="save"  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Save className="w-4 h-4" /> Save changes</motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Section: Notifications ────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    leadNew: true, leadScore: true, leadFollowup: false,
    meetingReminder: true, meetingBooked: true,
    campaignUpdates: false, campaignResults: true,
    aiInsights: true, aiHandoff: true, aiAlerts: false,
    emailDigest: true, slackPush: false, mobilePush: true,
  });
  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const groups = [
    {
      title: "Lead Activity", subtitle: "Notifications about lead interactions", icon: Target, delay: 0.05,
      rows: [
        { key: "leadNew",      label: "New lead captured",         sub: "When AI captures a new lead from any channel" },
        { key: "leadScore",    label: "Lead score change",         sub: "When a lead's AI score changes significantly" },
        { key: "leadFollowup", label: "Follow-up reminders",       sub: "Daily digest of pending lead follow-ups" },
      ],
    },
    {
      title: "Meetings", subtitle: "Scheduling and meeting updates", icon: Clock, delay: 0.1,
      rows: [
        { key: "meetingReminder", label: "Meeting reminders",  sub: "30 minutes before scheduled calls" },
        { key: "meetingBooked",   label: "Meeting booked",     sub: "When a lead books a meeting via AI" },
      ],
    },
    {
      title: "Campaigns", subtitle: "Campaign performance alerts", icon: Zap, delay: 0.15,
      rows: [
        { key: "campaignUpdates", label: "Campaign updates",  sub: "Status changes to active campaigns" },
        { key: "campaignResults", label: "Campaign results",  sub: "Weekly performance summaries" },
      ],
    },
    {
      title: "AI Assistant", subtitle: "AI activity and recommendations", icon: Brain, delay: 0.2,
      rows: [
        { key: "aiInsights", label: "New AI insights",      sub: "When AI detects high-value opportunities" },
        { key: "aiHandoff",  label: "Human handoff alerts", sub: "When AI requests manual review" },
        { key: "aiAlerts",   label: "AI error alerts",      sub: "System anomalies and failures" },
      ],
    },
    {
      title: "Delivery Channels", subtitle: "How you receive notifications", icon: Bell, delay: 0.25,
      rows: [
        { key: "emailDigest", label: "Email digest",    sub: "Daily summary to rajesh@jindalsmartbuild.com" },
        { key: "slackPush",   label: "Slack push",      sub: "Push to connected Slack workspace" },
        { key: "mobilePush",  label: "Mobile push",     sub: "iOS / Android SmartBuild app" },
      ],
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-primary/20 bg-primary/5">
        <Info className="w-4 h-4 text-primary shrink-0" />
        <p className="text-xs text-primary/80">8 notification rules are currently active across your workspace.</p>
      </div>

      {groups.map((g) => (
        <SectionCard key={g.title} title={g.title} subtitle={g.subtitle} icon={g.icon} delay={g.delay}>
          <div className="pt-1">
            {g.rows.map((row) => (
              <SettingRow key={row.key} label={row.label} sub={row.sub}>
                <Toggle enabled={prefs[row.key]} onChange={() => toggle(row.key)} />
              </SettingRow>
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Section: Security ─────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function SecuritySection() {
  const [twoFA, setTwoFA] = useState(true);
  const [sessionLock, setSessionLock] = useState(false);

  const sessions = [
    { device: "MacBook Pro 16\"", location: "Mumbai, India", icon: Monitor, current: true,  last: "Now" },
    { device: "iPhone 15 Pro",   location: "Mumbai, India", icon: Smartphone, current: false, last: "2 hours ago" },
    { device: "Chrome — Windows", location: "Delhi, India",  icon: Monitor, current: false, last: "1 day ago" },
    { device: "Safari — iPad",   location: "Bangalore",     icon: Smartphone, current: false, last: "3 days ago" },
  ];

  const trusted = [
    { name: "MacBook Pro 16\"",    added: "Added Jan 2025" },
    { name: "iPhone 15 Pro",      added: "Added Feb 2025" },
    { name: "Office Windows PC",  added: "Added Mar 2025" },
  ];

  return (
    <div className="space-y-5">
      {/* Status overview */}
      <SectionCard title="Security Status" subtitle="Workspace health and access posture" icon={Shield} delay={0.05}>
        <div className="pt-2">
          <SettingRow label="Two-factor authentication" sub="Authenticator app enabled">
            <div className="flex items-center gap-3">
              <Badge variant="success">Enabled</Badge>
              <Toggle enabled={twoFA} onChange={() => setTwoFA(p => !p)} />
            </div>
          </SettingRow>
          <SettingRow label="Admin sessions" sub="Currently active">
            <Badge variant="warning">4 active</Badge>
          </SettingRow>
          <SettingRow label="Trusted devices" sub="Registered devices">
            <Badge variant="muted">12 devices</Badge>
          </SettingRow>
          <SettingRow label="Last security review" sub="Full audit completed" border={false}>
            <Badge variant="success">3 days ago</Badge>
          </SettingRow>
        </div>
      </SectionCard>

      {/* Change password */}
      <SectionCard title="Change Password" subtitle="Update your account password" icon={Key} delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="sm:col-span-2">
            <Field label="Current password" defaultValue="" type="password" icon={Lock} />
          </div>
          <Field label="New password"     defaultValue="" type="password" icon={Key} />
          <Field label="Confirm password" defaultValue="" type="password" icon={Key} />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity">
            Update password
          </button>
          <p className="text-xs text-muted-foreground">Min 12 characters · 1 uppercase · 1 symbol</p>
        </div>
      </SectionCard>

      {/* Active sessions */}
      <SectionCard title="Active Sessions" subtitle="Devices currently logged in" icon={Wifi} delay={0.15}>
        <div className="pt-3 space-y-2.5">
          {sessions.map((s, i) => {
            const Icon = s.icon;
            return (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3.5">
              <div className="w-9 h-9 rounded-xl bg-muted/40 flex items-center justify-center shrink-0">
                {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{s.device}</p>
                <p className="text-xs text-muted-foreground">{s.location} · {s.last}</p>
              </div>
              {s.current ? (
                <Badge variant="success">Current</Badge>
              ) : (
                <button className="text-xs text-destructive hover:underline font-medium shrink-0">Revoke</button>
              )}
            </div>
            );
          })}
          <button className="w-full mt-1 py-2 rounded-xl border border-destructive/30 text-xs font-semibold text-destructive hover:bg-destructive/5 transition-colors">
            Revoke all other sessions
          </button>
        </div>
      </SectionCard>

      {/* Trusted devices */}
      <SectionCard title="Trusted Devices" subtitle="Devices that skip 2FA verification" icon={Smartphone} delay={0.2}>
        <div className="pt-3 space-y-2.5">
          {trusted.map((d, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3">
              <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                <Monitor className="w-3.5 h-3.5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.added}</p>
              </div>
              <button className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Advanced */}
      <SectionCard title="Advanced Security" subtitle="Additional protection settings" icon={AlertTriangle} delay={0.25}>
        <div className="pt-2">
          <SettingRow label="Auto session lock" sub="Lock workspace after 30 min inactivity" border={false}>
            <Toggle enabled={sessionLock} onChange={() => setSessionLock(p => !p)} />
          </SettingRow>
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Section: Appearance ───────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function AppearanceSection() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
  const [density, setDensity] = useState<"compact" | "normal" | "spacious">("normal");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [animations, setAnimations] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="space-y-5">
      {/* Theme */}
      <SectionCard title="Theme" subtitle="Workspace colour mode" icon={Palette} delay={0.05}>
        <div className="pt-4 grid grid-cols-3 gap-3">
          {[
            { id: "light", label: "Light", icon: Sun },
            { id: "dark",  label: "Dark",  icon: Moon },
            { id: "system",label: "System",icon: Monitor },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTheme(id as typeof theme)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border py-4 transition-all",
                theme === id
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border/40 bg-muted/15 text-muted-foreground hover:bg-muted/30"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{label}</span>
              {theme === id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Density */}
      <SectionCard title="Layout Density" subtitle="Control spacing and information density" icon={Layout} delay={0.1}>
        <div className="pt-4 grid grid-cols-3 gap-3">
          {[
            { id: "compact",  label: "Compact",  sub: "More info" },
            { id: "normal",   label: "Normal",   sub: "Balanced" },
            { id: "spacious", label: "Spacious", sub: "Breathable" },
          ].map(({ id, label, sub }) => (
            <button
              key={id}
              onClick={() => setDensity(id as typeof density)}
              className={cn(
                "rounded-2xl border py-3.5 px-3 text-left transition-all",
                density === id
                  ? "border-primary/60 bg-primary/10"
                  : "border-border/40 bg-muted/15 hover:bg-muted/30"
              )}
            >
              <p className={cn("text-xs font-semibold", density === id ? "text-primary" : "text-foreground")}>{label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Font size */}
      <SectionCard title="Text Size" subtitle="Base font size for the dashboard" icon={Type} delay={0.15}>
        <div className="pt-4 flex gap-3">
          {[{ id: "sm", label: "Small" }, { id: "md", label: "Medium" }, { id: "lg", label: "Large" }].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFontSize(id as typeof fontSize)}
              className={cn(
                "flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all",
                fontSize === id
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border/40 bg-muted/15 text-muted-foreground hover:bg-muted/30"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Misc toggles */}
      <SectionCard title="Interface Preferences" subtitle="Motion and layout options" icon={Sliders} delay={0.2}>
        <div className="pt-2">
          <SettingRow label="Animations & transitions" sub="Enable micro-interactions and page transitions">
            <Toggle enabled={animations} onChange={() => setAnimations(p => !p)} />
          </SettingRow>
          <SettingRow label="Collapsed sidebar" sub="Start with navigation rail minimised" border={false}>
            <Toggle enabled={sidebarCollapsed} onChange={() => setSidebarCollapsed(p => !p)} />
          </SettingRow>
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Section: Integrations ─────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function IntegrationsSection() {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    salesforce: true, hubspot: false, googleCalendar: true,
    slack: true, whatsapp: true, meta: false,
    gmail: true, zapier: false,
  });
  const toggle = (k: string) => setConnected(p => ({ ...p, [k]: !p[k] }));

  const integrations = [
    {
      group: "CRM", icon: Building, delay: 0.05,
      items: [
        { key: "salesforce",     name: "Salesforce",    desc: "Sync leads and opportunities",        badge: "Popular" },
        { key: "hubspot",        name: "HubSpot CRM",   desc: "Two-way lead and contact sync",       badge: null      },
      ],
    },
    {
      group: "Communication", icon: MessageSquare, delay: 0.1,
      items: [
        { key: "slack",          name: "Slack",         desc: "AI alerts and lead notifications",    badge: null      },
        { key: "whatsapp",       name: "WhatsApp Business", desc: "Capture and respond to WhatsApp leads", badge: "Active" },
        { key: "gmail",          name: "Gmail",         desc: "Email thread sync and tracking",      badge: null      },
      ],
    },
    {
      group: "Calendar & Scheduling", icon: Clock, delay: 0.15,
      items: [
        { key: "googleCalendar", name: "Google Calendar", desc: "Auto-schedule meetings from leads", badge: null },
      ],
    },
    {
      group: "Advertising", icon: Target, delay: 0.2,
      items: [
        { key: "meta",           name: "Meta Ads",      desc: "Facebook & Instagram lead forms",     badge: null },
      ],
    },
    {
      group: "Automation", icon: Zap, delay: 0.25,
      items: [
        { key: "zapier",         name: "Zapier",        desc: "Connect 5000+ apps via triggers",     badge: "Beta" },
      ],
    },
  ];

  const connectedCount = Object.values(connected).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-success/20 bg-success/5">
        <Check className="w-4 h-4 text-success shrink-0" />
        <p className="text-xs text-success/90">{connectedCount} integrations connected · Sync active</p>
      </div>

      {integrations.map((g) => (
        <SectionCard key={g.group} title={g.group} icon={g.icon} delay={g.delay}>
          <div className="pt-3 space-y-2.5">
            {g.items.map((item) => (
              <div key={item.key} className="flex items-center gap-3.5 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3.5 hover:bg-muted/25 transition-colors">
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold",
                  connected[item.key] ? "gradient-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
                )}>
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    {item.badge && <Badge variant={item.badge === "Active" ? "success" : "muted"}>{item.badge}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  {connected[item.key] && (
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <Toggle enabled={connected[item.key]} onChange={() => toggle(item.key)} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Section: AI Configuration ─────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function AIConfigSection() {
  const [settings, setSettings] = useState({
    leadScoring:    true,
    suggestedReplies: true,
    campaignRecs:   false,
    autoFollowup:   true,
    sentimentAnalysis: true,
    voiceAI:        true,
    humanHandoff:   true,
    dataLearning:   false,
  });
  const toggle = (k: keyof typeof settings) => setSettings(p => ({ ...p, [k]: !p[k] }));

  const [mode, setMode] = useState<"conservative" | "balanced" | "aggressive">("aggressive");
  const [responseDelay, setResponseDelay] = useState(2);

  return (
    <div className="space-y-5">
      {/* Automation mode */}
      <SectionCard title="Automation Mode" subtitle="Controls how proactively AI engages leads" icon={Zap} delay={0.05}>
        <div className="pt-4 grid grid-cols-3 gap-3">
          {[
            { id: "conservative", label: "Conservative", sub: "Human approves each action",  color: "text-success" },
            { id: "balanced",     label: "Balanced",     sub: "AI suggests, human confirms", color: "text-primary" },
            { id: "aggressive",   label: "High Automation", sub: "Fully autonomous AI",        color: "text-warning" },
          ].map(({ id, label, sub, color }) => (
            <button
              key={id}
              onClick={() => setMode(id as typeof mode)}
              className={cn(
                "rounded-2xl border py-4 px-3 text-left transition-all",
                mode === id ? "border-primary/50 bg-primary/8" : "border-border/40 bg-muted/15 hover:bg-muted/25"
              )}
            >
              <p className={cn("text-xs font-bold", mode === id ? color : "text-foreground")}>{label}</p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{sub}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* AI Features */}
      <SectionCard title="AI Features" subtitle="Enable or disable individual AI capabilities" icon={Brain} delay={0.1}>
        <div className="pt-2">
          {[
            { key: "leadScoring",       label: "Lead scoring automation",  sub: "Auto-score leads using engagement signals" },
            { key: "suggestedReplies",  label: "Suggested replies",        sub: "AI drafts responses for human review" },
            { key: "campaignRecs",      label: "Campaign recommendations", sub: "AI suggests optimal campaign content" },
            { key: "autoFollowup",      label: "Automatic follow-ups",     sub: "AI re-engages cold leads on a schedule" },
            { key: "sentimentAnalysis", label: "Sentiment analysis",       sub: "Real-time conversation tone detection" },
            { key: "voiceAI",           label: "Voice AI calling",         sub: "Outbound AI voice engagement" },
            { key: "humanHandoff",      label: "Smart human handoff",      sub: "AI escalates complex queries to your team" },
            { key: "dataLearning",      label: "Adaptive learning",        sub: "AI improves from your team's edits" },
          ].map(({ key, label, sub }, i, arr) => (
            <SettingRow key={key} label={label} sub={sub} border={i < arr.length - 1}>
              <Toggle enabled={settings[key as keyof typeof settings]} onChange={() => toggle(key as keyof typeof settings)} />
            </SettingRow>
          ))}
        </div>
      </SectionCard>

      {/* Response timing */}
      <SectionCard title="Response Timing" subtitle="How quickly AI responds to incoming messages" icon={Clock} delay={0.15}>
        <div className="pt-4 space-y-4">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Delay before response</span>
              <span className="font-semibold text-foreground">{responseDelay}s</span>
            </div>
            <input
              type="range" min={0} max={10} value={responseDelay}
              onChange={(e) => setResponseDelay(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Instant</span><span>10 seconds</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A small delay (2–4s) makes responses feel more natural and human-like.
          </p>
        </div>
      </SectionCard>

      {/* AI Performance stats */}
      <SectionCard title="AI Performance" subtitle="Current AI system metrics" icon={Bot} delay={0.2}>
        <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Avg Response", value: "< 4s",  color: "text-success" },
            { label: "Handled",      value: "91%",   color: "text-primary" },
            { label: "Accuracy",     value: "94.2%", color: "text-success" },
            { label: "Uptime",       value: "99.9%", color: "text-success" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-border/40 bg-muted/15 px-3 py-3.5 text-center">
              <p className={cn("text-lg font-bold", color)}>{value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Nav items config ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

const navItems: { id: SectionId; label: string; icon: React.ElementType; sub: string }[] = [
  { id: "profile",       label: "Profile",        icon: User,    sub: "Account & identity"        },
  { id: "notifications", label: "Notifications",  icon: Bell,    sub: "Alerts & rules"             },
  { id: "security",      label: "Security",       icon: Shield,  sub: "Access & devices"           },
  { id: "appearance",    label: "Appearance",     icon: Palette, sub: "Theme & layout"             },
  { id: "integrations",  label: "Integrations",   icon: Globe,   sub: "Connected apps"             },
  { id: "ai",            label: "AI Configuration", icon: Zap,   sub: "Automation preferences"    },
];

const sectionComponents: Record<SectionId, React.ElementType> = {
  profile:       ProfileSection,
  notifications: NotificationsSection,
  security:      SecuritySection,
  appearance:    AppearanceSection,
  integrations:  IntegrationsSection,
  ai:            AIConfigSection,
};

// ══════════════════════════════════════════════════════════════════════════════
// ── Main Settings Page ────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const requestedSection = searchParams?.get("section");
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  useEffect(() => {
    if (requestedSection && requestedSection in sectionComponents) {
      setActiveSection(requestedSection as SectionId);
    }
  }, [requestedSection]);

  const ActiveComponent = sectionComponents[activeSection];
  const activeNav = navItems.find((n) => n.id === activeSection)!;

  return (
    <div className="mx-auto max-w-350 space-y-7">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      {/* User identity banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border/60 bg-card/90 px-7 py-6"
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-8">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0">
            RJ
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 xl:flex xl:min-h-16 xl:flex-col xl:justify-center xl:pr-6">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Rajesh Jindal</h2>
            <p className="mt-1 text-sm text-muted-foreground/90">rajesh@jindalsmartbuild.com</p>
            <p className="mt-1.5 text-[13px] font-medium text-muted-foreground">CXO • Enterprise Plan</p>
          </div>

          {/* Meta pills */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-125 xl:pl-4">
            {[
              { label: "WORKSPACE", value: "Enterprise" },
              { label: "USERS",     value: "24 active"  },
              { label: "SECURITY",  value: "Protected"  },
              { label: "REGION",    value: "India West" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-center xl:flex xl:min-h-16 xl:flex-col xl:justify-center">
                <p className="text-[10px] font-bold text-muted-foreground/75 tracking-[0.18em] uppercase">{label}</p>
                <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Body: nav + content */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch">

        {/* Left nav */}
        <motion.nav
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-border/60 bg-card/90 p-4 xl:w-64 xl:shrink-0 xl:self-stretch"
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {navItems.map(({ id, label, icon: Icon, sub }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "w-full flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all group",
                  activeSection === id
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4.5 w-4.5 shrink-0", activeSection === id ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-semibold leading-none", activeSection === id ? "text-primary-foreground" : "text-foreground")}>{label}</p>
                  <p className={cn("mt-1 text-xs truncate", activeSection === id ? "text-primary-foreground/70" : "text-muted-foreground")}>{sub}</p>
                </div>
                <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", activeSection === id ? "text-primary-foreground opacity-70" : "opacity-0 group-hover:opacity-50")} />
              </button>
            ))}
          </div>
        </motion.nav>

        {/* Content panel */}
        <div className="flex-1 min-w-0">
          {/* Section breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <activeNav.icon className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground leading-none">{activeNav.label}</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">{activeNav.sub}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
