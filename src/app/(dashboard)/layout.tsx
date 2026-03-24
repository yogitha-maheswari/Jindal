import { DashboardLayout } from "@/components/DashboardLayout";
import { FloatingOrb } from "@/components/FloatingOrb";

export default function DashboardRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>
            {children}
            <FloatingOrb />
        </DashboardLayout>
    );
}