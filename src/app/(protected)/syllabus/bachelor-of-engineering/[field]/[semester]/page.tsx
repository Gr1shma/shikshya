import Link from "next/link";

const semesterLabelMap: Record<string, string> = {
    "first-semester": "Semester 1",
    "second-semester": "Semester 2",
    "third-semester": "Semester 3",
    "fourth-semester": "Semester 4",
    "fifth-semester": "Semester 5",
    "sixth-semester": "Semester 6",
    "seventh-semester": "Semester 7",
    "eighth-semester": "Semester 8",
};

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

const computerEngineeringSubjects: Record<string, string[]> = {
    "first-semester": [
        "Applied Mechanics [CE 401]",
        "Basic Electrical Engineering [EE 401]",
        "Engineering Physics [SH 402]",
        "Engineering Drawing I [ME 401]",
        "Engineering Mathematics I [SH 401]",
        "Computer Programming [CT 401]",
    ],
    "second-semester": [
        "Engineering Mathematics II [SH 451]",
        "Engineering Drawing II [ME 451]",
        "Basic Electronics Engineering [EX 451]",
        "Engineering Chemistry [SH 453]",
        "Fundamental of Thermodynamics & Heat Transfer [ME 452]",
        "Workshop Technology [ME 453]",
    ],
    "third-semester": [
        "Engineering Mathematics III [SH 501]",
        "Object Oriented Programming [CT 501]",
        "Electric Circuit Theory [EE 501]",
        "Theory of Computation [CT 502]",
        "Electronics Devices and Circuit [EX 501]",
        "Digital Logic [EX 502]",
        "Electromagnetics [EX 503]",
    ],
    "fourth-semester": [
        "Numerical Method [SH 553]",
        "Applied Mathematics [SH 551]",
        "Instrumentation I [EE 552]",
        "Data Structure and Algorithm [CT 552]",
        "Microprocessor [EX 551]",
        "Discrete Structure [CT 551]",
        "Electrical Machine [EE 554]",
    ],
    "fifth-semester": [
        "Communication English [SH 601]",
        "Probability and Statistics [SH 602]",
        "Computer organization and Architecture [CT 603]",
        "Software Engineering [CT 601]",
        "Computer Graphics [EX 603]",
        "Instrumentation II [EX 602]",
        "Data Communication [CT 602]",
    ],
    "sixth-semester": [
        "Engineering Economics [CE 655]",
        "Object Oriented Analysis and Design [CT 651]",
        "Artificial Intelligence [CT 653]",
        "Operating System [CT 656]",
        "Embedded System [CT 655]",
        "Database Management System [CT 652]",
        "Minor Project [CT 654]",
    ],
    "seventh-semester": [
        "ICT Project Management [CT 701]",
        "Organization and Management [ME 708]",
        "Energy Environment and Society [EX 701]",
        "Distributed System [CT 703]",
        "Computer Networks and Security [CT 702]",
        "Digital Signal Analysis and Processing [CT 704]",
        "Project (Part A) [CT 707]",
        "Elective I : Advanced Java [CT 725 01]",
        "Elective I : Aeronautical Telecom [EX 725 04]",
        "Elective I : Biomedical Instrumentation",
        "Elective I : Data Mining",
        "Elective I : Embedded System",
        "Elective I : Image Processing [CT 725 04]",
        "Elective I : Microwave Engineering [EX 725 05]",
        "Elective I : Operating System",
        "Elective I : Radar Technology",
        "Elective I : Satellite Communicaation",
        "Elective I : Web Technology [CT 725 05]",
    ],
    "eighth-semester": [
        "Engineering Professional Practice [CE 752]",
        "Information Systems [CT 751]",
        "Internet and Intranet [CT 754]",
        "Project (Part B) [CT 755]",
        "Simulation and Modelling [CT 753]",
        "Elective II : ADVANCED COMPUTER ARCHITECTURE [CT 765 04]",
        "Elective II : AGILE SOFTWARE DEVELOPMENT [CT 765 02]",
        "Elective II : BIG DATA TECHNOLOGIES [CT 765 07]",
        "Elective II : BROADCAST ENGINEERING [EX 765 03]",
        "Elective II : DATABASE MANAGEMENT SYSTEMS [EX 765 06]",
        "Elective II : NETWORKING WITH IPV6 [CT 765 03]",
        "Elective II : OPTICAL FIBER COMMUNICATION SYSTEM [EX 765 01]",
        "Elective II : WIRELESS COMMUNICATIONS [EX 765 04]",
        "Elective III : ARTIFICIAL INTELLIGENCE [CT 785 06]",
        "Elective III : ENTERPRISE APPLICATION DESIGN AND DEVELOPMENT [CT 785 04]",
        "Elective III : GEOGRAPHICAL INFORMATION SYSTEM [CT 785 07]",
        "Elective III : MULTIMEDIA SYSTEM [CT 785 03]",
        "Elective III : POWER ELECTRONICS [EE 785 07]",
        "Elective III : REMOTE SENSING [CT 785 01]",
        "Elective III : SPEECH PROCESSING [CT 785 08]",
        "Elective III : TELECOMMUNICATION [EX 785 03]",
        "Elective III : XML: FOUNDATIONS, TECHNIQUES AND APPLICATIONS [CT 785 05]",
    ],
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default async function EngineeringSemesterPage({
    params,
}: {
    params: Promise<{ field: string; semester: string }>;
}) {
    const { field, semester } = await params;
    const fieldTitle = formatFieldTitle(field);
    const semesterTitle = semesterLabelMap[semester] ?? "Semester";
    const isComputerEngineering = field === "computer-engineering";
    const subjects = isComputerEngineering
        ? computerEngineeringSubjects[semester] ?? []
        : [];

    return (
        <div className="px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">
                    {fieldTitle} - {semesterTitle}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Subjects and syllabus content will appear here.
                </p>
            </div>

            {subjects.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2">
                    {subjects.map((subject) => (
                        <Link
                            key={subject}
                            href={`/syllabus/bachelor-of-engineering/${field}/${semester}/${slugify(
                                subject
                            )}`}
                            className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-white transition hover:border-indigo-500/40"
                        >
                            {subject}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-400">
                    Subjects list coming soon.
                </div>
            )}
        </div>
    );
}
