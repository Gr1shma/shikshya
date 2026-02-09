import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";
import MainLayout from "~/components/layout/main-layout";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect("/auth");
    }

    return <MainLayout>{children}</MainLayout>;
}
