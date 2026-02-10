import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";
import AdminPanel from "~/modules/admin/admin-panel";

export default async function AdminPage() {
    const session = await getSession();

    if (!session) {
        redirect("/auth");
    }

    if (session.user.role !== "admin") {
        redirect("/dashboard");
    }

    return <AdminPanel />;
}
