"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ResponsiveContainer } from "recharts";

type SafeResponsiveContainerProps = {
  children: ReactNode;
};

export function SafeResponsiveContainer({
  children,
}: SafeResponsiveContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full min-w-0" aria-hidden="true" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      {children}
    </ResponsiveContainer>
  );
}
