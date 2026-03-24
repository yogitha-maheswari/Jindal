"use client";

import Link from "next/link";
import {
    Zap,
    ArrowRight,
    Brain,
    MessageSquare,
    Phone,
    BarChart3,
    Users,
    Shield,
    Sun,
    Moon,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const features = [
    {
        icon: Brain,
        title: "AI Lead Qualification",
        description:
            "Instantly score and qualify leads using advanced AI analysis of budget, timeline, and engagement patterns.",
    },
    {
        icon: MessageSquare,
        title: "Smart Conversations",
        description:
            "AI-powered chat that understands construction industry context and engages prospects intelligently.",
    },
    {
        icon: Phone,
        title: "Voice AI Agent",
        description:
            "Automated voice calls that qualify leads, schedule meetings, and hand off to sales seamlessly.",
    },
    {
        icon: BarChart3,
        title: "Deep Analytics",
        description:
            "Real-time dashboards with conversion funnels, channel performance, and AI-generated insights.",
    },
    {
        icon: Users,
        title: "Omni-Channel Reach",
        description:
            "Engage leads across WhatsApp, Email, Chat, and Voice with unified conversation history.",
    },
    {
        icon: Shield,
        title: "CXO-Grade Security",
        description:
            "Enterprise-level data protection with role-based access and compliance-ready infrastructure.",
    },
];

const stats = [
    { value: "3.2×", label: "Faster Qualification" },
    { value: "68%", label: "Lead Conversion Lift" },
    { value: "24/7", label: "Always-On AI" },
    { value: "500+", label: "Projects Closed" },
];

/* Shared container — full bleed on wide screens with comfortable padding */
const container = "w-full max-w-screen-7xl mx-auto px-8 md:px-12 xl:px-20";

export default function LandingPage() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    const toggleDark = () => {
        setDarkMode((prev) => {
            const next = !prev;
            if (next) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">

            {/* ── Ambient background orbs ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 left-1/3 w-200 h-200 rounded-full bg-primary/6 blur-[160px] animate-float" />
                <div
                    className="absolute top-1/2 -right-40 w-175 h-175 rounded-full bg-accent/6 blur-[160px] animate-float"
                    style={{ animationDelay: "2s" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-150 h-150 rounded-full bg-primary/4 blur-[140px] animate-float"
                    style={{ animationDelay: "4s" }}
                />
                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035]"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
            </div>

            {/* ══════════════════════════════════════
                NAVBAR
            ══════════════════════════════════════ */}
            <nav className={`relative z-20 h-20 flex items-center justify-between ${container}`}>
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        <Zap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <span className="font-bold gradient-text text-xl leading-none tracking-tight">
                            Jindal
                        </span>
                        <span className="block text-[10px] font-medium text-muted-foreground tracking-widest uppercase mt-0.5">
                            AI Platform
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <button
                        onClick={toggleDark}
                        className="p-2.5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-muted/60 transition-all hover:border-border group"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? (
                            <Sun className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        ) : (
                            <Moon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        )}
                    </button>

                    <Link
                        href="/login"
                        className="px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted/40"
                    >
                        Sign In
                    </Link>

                    <Link
                        href="/signup"
                        className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:opacity-90 hover:shadow-primary/40 transition-all flex items-center gap-1.5"
                    >
                        Get Started <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                </motion.div>
            </nav>

            {/* ══════════════════════════════════════
                HERO
            ══════════════════════════════════════ */}
            <section className={`relative z-10 ${container} text-center pt-32 pb-28`}>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold backdrop-blur-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI-Powered Lead Engagement Platform
                        <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">NEW</span>
                    </span>
                </motion.div>

                {/* Headline — generous line height + more vertical breathing */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl md:text-6xl lg:text-[72px] font-extrabold text-foreground leading-[1.12] tracking-tight mb-10 max-w-6xl mx-auto"
                >
                    Intelligent Lead Engagement
                    for{" "}
                    <span className="gradient-text relative inline-block">
                        High-Value
                        <span className="absolute -bottom-1.5 left-0 right-0 h-0.75 gradient-primary rounded-full opacity-60" />
                    </span>{" "}
                    Construction
                </motion.h1>

                {/* Sub — wider, more line-height */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto mb-14 leading-[1.8] tracking-wide"
                >
                    Automate lead qualification, engage across channels with AI, and
                    convert high-value prospects into deals — all from one intelligent platform.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
                >
                    <Link
                        href="/signup"
                        className="w-full sm:w-auto px-12 py-4.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-base shadow-xl shadow-primary/30 hover:opacity-90 hover:shadow-primary/45 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                        style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}
                    >
                        Start Free Trial
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <Link
                        href="/login"
                        className="w-full sm:w-auto px-12 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm text-foreground font-semibold text-base hover:bg-muted/40 hover:border-border hover:-translate-y-0.5 transition-all text-center"
                        style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}
                    >
                        View Demo
                    </Link>
                </motion.div>

                {/* Stats strip — same full container width as rest of sections */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40 backdrop-blur-sm w-full"
                >
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="bg-card/60 px-6 py-8 flex flex-col items-center gap-2 hover:bg-muted/30 transition-colors"
                        >
                            <span className="text-3xl font-extrabold gradient-text">{s.value}</span>
                            <span className="text-sm text-muted-foreground font-medium tracking-wide">{s.label}</span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ══════════════════════════════════════
                FEATURES
            ══════════════════════════════════════ */}
            <section className={`relative z-10 ${container} pb-36`}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-4 block">
                        Everything you need
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-5">
                        Built for construction sales teams
                    </h2>
                    <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
                        Every feature designed to close high-ticket projects faster with less manual effort.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="group glass-card rounded-2xl p-8 hover-lift cursor-default flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/20"
                        >
                            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/25 shrink-0">
                                <f.icon className="w-5 h-5 text-white" />
                            </div>

                            <h3 className="text-base font-semibold text-foreground mb-3 tracking-tight">
                                {f.title}
                            </h3>

                            <p className="text-sm text-muted-foreground leading-[1.75] grow">
                                {f.description}
                            </p>

                            <div className="mt-7 h-px w-0 group-hover:w-full gradient-primary transition-all duration-500 rounded-full opacity-60" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
                CTA BANNER
            ══════════════════════════════════════ */}
            <section className={`relative z-10 ${container} pb-36`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="gradient-primary rounded-3xl px-14 py-24 text-center relative overflow-hidden"
                >
                    <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-[80px]" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-[80px]" />

                    <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-6 backdrop-blur-sm">
                        <Zap className="w-3 h-3" /> Limited Early Access
                    </span>
                    <h2 className="relative text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Ready to close more deals?
                    </h2>
                    <p className="relative text-white/80 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                        Join 100+ construction firms already using Jindal to qualify and convert faster.
                    </p>
                    <Link
                        href="/signup"
                        className="relative inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white font-bold text-base shadow-xl hover:opacity-95 hover:-translate-y-0.5 transition-all group"
                        style={{ color: "hsl(var(--primary))" }}
                    >
                        Get Early Access
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════
                FOOTER
            ══════════════════════════════════════ */}
            <footer className={`relative z-10 border-t border-border/40 py-12 ${container} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-semibold gradient-text">Jindal</span>
                </div>
                <p className="text-xs text-muted-foreground">
                    © 2026 Jindal. All rights reserved.
                </p>
                <div className="flex items-center gap-5 text-xs text-muted-foreground">
                    <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
                </div>
            </footer>

        </div>
    );
}
