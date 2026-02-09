import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";

export default async function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect("/auth");
    }

    if (session.user.onboardingCompleted) {
        redirect("/dashboard");
    }

    return <>{children}</>;
}
