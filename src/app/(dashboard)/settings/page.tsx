import { connection } from "next/server";

import SettingsPage from "@/pages/SettingsPage";

export default async function Page() {
    await connection();

    return <SettingsPage />;
}
