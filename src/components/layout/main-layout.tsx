import Navbar from "~/components/layout/navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
            <Navbar />

            <main className="container mx-auto mt-12 px-4 pb-12">
                {children}
            </main>
        </div>
    );
}
