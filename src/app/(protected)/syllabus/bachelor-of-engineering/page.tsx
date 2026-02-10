import Link from "next/link";

const engineeringFields = [
    {
        title: "Computer Engineering (BCT)",
        slug: "computer-engineering",
    },
    {
        title: "Electrical Engineering (BEL)",
        slug: "electrical-engineering",
    },
    {
        title: "Electronics and Communication (BEX)",
        slug: "electronics-and-communication",
    },
    {
        title: "Agriculture Engineering (BAG)",
        slug: "agriculture-engineering",
    },
    {
        title: "Architecture Engineering (B.Arch)",
        slug: "architecture-engineering",
    },
    {
        title: "Mechanical Engineering (BME)",
        slug: "mechanical-engineering",
    },
    {
        title: "Civil Engineering (BCE)",
        slug: "civil-engineering",
    },
    {
        title: "Electronics and Information (BEI New)",
        slug: "electronics-and-information",
    },
    {
        title: "Automobile Engineering",
        slug: "automobile-engineering",
    },
    {
        title: "Aerospace Engineering",
        slug: "aerospace-engineering",
    },
    {
        title: "Geomatics Engineering",
        slug: "geomatics-engineering",
    },
    {
        title: "Industrial Engineering [BIE]",
        slug: "industrial-engineering",
    },
];

export default function BachelorOfEngineeringPage() {
    return (
        <div className="px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">
                    Bachelor of Engineering
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Choose an engineering field to explore semesters.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {engineeringFields.map((field) => (
                    <Link
                        key={field.slug}
                        href={`/syllabus/bachelor-of-engineering/${field.slug}`}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg shadow-slate-950/40 transition hover:border-indigo-500/40"
                    >
                        <h2 className="text-lg font-semibold text-white">
                            {field.title}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">
                            View semesters 1 - 8
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
