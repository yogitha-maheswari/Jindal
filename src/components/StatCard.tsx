"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: LucideIcon;
    delay?: number;
}

export function StatCard({ title, value, change, trend, icon: Icon, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="glass-card hover-lift group relative overflow-hidden rounded-[26px] border border-border/60 bg-card/90 p-6"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-border/80" />
                <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
            </div>

            <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-[1.03]">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-[-0.01em] text-primary-foreground shadow-lg shadow-primary/20",
                    trend === "up"
                        ? "gradient-accent"
                        : "gradient-primary"
                )}>
                    {trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {change}
                </div>
            </div>

            <div className="relative mt-8">
                <p className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
                    {value}
                </p>
                <p className="mt-3 text-sm text-muted-foreground/80">{title}</p>
            </div>
        </motion.div>
    );
}
