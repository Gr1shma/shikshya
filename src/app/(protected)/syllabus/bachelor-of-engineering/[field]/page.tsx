import Link from "next/link";

const semesterSlugs = [
    { title: "Semester 1", slug: "first-semester" },
    { title: "Semester 2", slug: "second-semester" },
    { title: "Semester 3", slug: "third-semester" },
    { title: "Semester 4", slug: "fourth-semester" },
    { title: "Semester 5", slug: "fifth-semester" },
    { title: "Semester 6", slug: "sixth-semester" },
    { title: "Semester 7", slug: "seventh-semester" },
    { title: "Semester 8", slug: "eighth-semester" },
];

const fieldTitleMap: Record<string, string> = {
    "computer-engineering": "Computer Engineering (BCT)",
    "electrical-engineering": "Electrical Engineering (BEL)",
    "electronics-and-communication": "Electronics and Communication (BEX)",
    "agriculture-engineering": "Agriculture Engineering (BAG)",
    "architecture-engineering": "Architecture Engineering (B.Arch)",
    "mechanical-engineering": "Mechanical Engineering (BME)",
    "civil-engineering": "Civil Engineering (BCE)",
    "electronics-and-information": "Electronics and Information (BEI New)",
    "automobile-engineering": "Automobile Engineering",
    "aerospace-engineering": "Aerospace Engineering",
    "geomatics-engineering": "Geomatics Engineering",
    "industrial-engineering": "Industrial Engineering [BIE]",
};

function formatFieldTitle(field: string) {
    return (
        fieldTitleMap[field] ??
        field
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ")
    );
}

export default async function EngineeringFieldPage({
    params,
}: {
    params: Promise<{ field: string }>;
}) {
    const { field } = await params;
    const fieldTitle = formatFieldTitle(field);

    return (
        <div className="px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">
                    {fieldTitle}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Select a semester to view subjects and syllabus content.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {semesterSlugs.map((semester) => (
                    <Link
                        key={semester.slug}
                        href={`/syllabus/bachelor-of-engineering/${field}/${semester.slug}`}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg shadow-slate-950/40 transition hover:border-indigo-500/40"
                    >
                        <h2 className="text-lg font-semibold text-white">
                            {semester.title}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">
                            Subjects coming soon
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
