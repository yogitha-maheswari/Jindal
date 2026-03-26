"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "./AppSidebar";
import { TopNavbar } from "./TopNavbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-dvh w-full bg-background">
            {/* Sidebar */}
            <AppSidebar
                open={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* Content */}
            <motion.div
                initial={false}
                animate={{ marginLeft: sidebarOpen ? 280 : 76 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-dvh min-w-0 flex-col"
            >
                {/* Top Navbar */}
                <TopNavbar
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </motion.div>
        </div>
    );
}
