import MainLayout from "~/components/layout/main-layout";

export default function LearnLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
