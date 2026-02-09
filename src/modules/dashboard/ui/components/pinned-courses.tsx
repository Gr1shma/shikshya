import React from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

// Mock data type, can be moved to a shared type file if needed
type Course = {
    id: number;
    name: string;
    progress: number;
    color: string;
};

interface PinnedCoursesProps {
    courses?: Course[];
}

export const PinnedCourses = ({
    courses = [
        {
            id: 1,
            name: "Bct i/ii",
            progress: 65,
            color: "from-blue-500 to-indigo-500",
        },
        {
            id: 2,
            name: "Bct iii/i",
            progress: 30,
            color: "from-purple-500 to-pink-500",
        },
    ],
}: PinnedCoursesProps) => {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                    <BookOpen className="size-5 text-indigo-400" />
                    Pinned Courses
                </h2>
                <Button variant="link" className="text-sm text-indigo-400">
                    View All
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        className="group cursor-pointer border-slate-800 bg-slate-900/40 transition-all hover:scale-[1.02] hover:bg-slate-900/60 active:scale-95"
                    >
                        <CardContent className="p-6">
                            <div className="mb-6 flex items-start justify-between">
                                <div
                                    className={`size-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg shadow-indigo-500/20`}
                                >
                                    <span className="text-xs font-bold text-white uppercase">
                                        Bct
                                    </span>
                                </div>
                                <ChevronRight className="text-slate-600 transition-colors group-hover:text-indigo-400" />
                            </div>
                            <h4 className="mb-2 text-lg font-bold text-white">
                                {course.name}
                            </h4>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-indigo-500 transition-all duration-1000"
                                    style={{
                                        width: `${course.progress}%`,
                                    }}
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                                {course.progress}% Completed
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
