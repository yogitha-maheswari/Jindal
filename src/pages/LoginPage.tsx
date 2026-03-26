"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Zap,
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        window.localStorage.setItem("jindal-auth", "true");
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px] animate-float" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[100px] animate-float"
                    style={{ animationDelay: "3s" }}
                />
            </div>

            {/* Navbar */}
            <nav className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-bold gradient-text">
                        Jindal
                    </span>
                </div>

                <Link
                    href="/signup"
                    className="px-4 py-2 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
                >
                    Sign Up
                </Link>
            </nav>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md mx-4 relative z-10"
            >
                <div className="glass-card-strong rounded-3xl p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-7 h-7 text-primary-foreground" />
                        </div>

                        <h1 className="text-2xl font-bold text-foreground">
                            Welcome Back
                        </h1>

                        <p className="text-sm text-muted-foreground mt-2">
                            Sign in to your AI engagement platform
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">
                                Email
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                                <input
                                    type="email"
                                    defaultValue="rajesh@jindalsmartbuild.com"
                                    className="w-full pl-10 pr-4 py-4 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">
                                Password
                            </label>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    defaultValue="password123"
                                    className="w-full pl-10 pr-10 py-4 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-xl gradient-accent py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-primary font-medium hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

            </motion.div>
        </div>
    );
}
