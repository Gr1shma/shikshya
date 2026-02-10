import Link from "next/link";

const syllabusCards = [
    {
        title: "Class 8",
        description: "Core subjects, lab practice, and assessments.",
        href: "/syllabus/class-8",
    },
    {
        title: "Class 9",
        description: "Foundation topics and exam preparation.",
        href: "/syllabus/class-9",
    },
    {
        title: "Class 10",
        description: "SEE readiness and subject-wise coverage.",
        href: "/syllabus/class-10",
    },
    {
        title: "Grade XI",
        description: "Streams and subject selections.",
        href: "/syllabus/grade-xi",
    },
    {
        title: "Grade XII",
        description: "Advanced content and board exam focus.",
        href: "/syllabus/grade-xii",
    },
    {
        title: "Bachelor of Engineering",
        description: "Programs, departments, and semester roadmap.",
        href: "/syllabus/bachelor-of-engineering",
    },
];

export default function SyllabusPage() {
    return (
        <div className="px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">Syllabus</h1>
                <p className="mt-2 text-sm text-slate-400">
                    Browse structured curricula by level and program.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {syllabusCards.map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg shadow-slate-950/40 transition hover:border-indigo-500/40"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    {card.title}
                                </h2>
                                <p className="mt-1 text-xs text-slate-400">
                                    {card.description}
                                </p>
                            </div>
                            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-semibold text-indigo-300">
                                View
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
