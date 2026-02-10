"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { UserAvatar } from "~/components/user-avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import { useSession } from "~/lib/auth-client";

export function CourseList() {
    const router = useRouter();
    const { data: session } = useSession();
    const [courses] = api.course.list.useSuspenseQuery();
    const { toast } = useToast();

    const { data: user } = api.user.getById.useQuery(
        { id: session?.user?.id ?? "" },
        { enabled: !!session?.user?.id }
    );

    const isStudent = user?.role === "student";
    const { data: myEnrollments } = api.enrollment.listMine.useQuery(
        undefined,
        { enabled: isStudent }
    );
    const enrolledCourseIds = new Set(
        (myEnrollments ?? []).map((enrollment) => enrollment.courseId)
    );

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <BookOpen className="mb-4 h-16 w-16 text-slate-600" />
                <h3 className="text-xl font-semibold text-white">
                    No courses yet
                </h3>
                <p className="mt-2 text-slate-400">
                    Create your first course to get started
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    isStudent={isStudent}
                    isEnrolled={enrolledCourseIds.has(course.id)}
                    onEnrollSuccess={() => router.push(`/course/${course.id}`)}
                />
            ))}
        </div>
    );
}

function CourseCard({
    course,
    isStudent,
    isEnrolled,
    onEnrollSuccess,
}: {
    course: {
        id: string;
        title: string;
        description: string | null;
        joinCode: string;
        createdAt: Date;
        teacherName: string | null;
        teacherImage: string | null;
        teacherRole: string | null;
    };
    isStudent: boolean;
    isEnrolled: boolean;
    onEnrollSuccess: () => void;
}) {
    const [open, setOpen] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const { toast } = useToast();

    const enroll = api.enrollment.joinWithCode.useMutation({
        onSuccess: (result) => {
            if (result.alreadyEnrolled) {
                toast({
                    title: "Already enrolled",
                    description: "You are already enrolled in this course.",
                });
            } else {
                toast({
                    title: "Enrolled successfully",
                    description: "Welcome to the course!",
                });
            }
            setOpen(false);
            setJoinCode("");
            onEnrollSuccess();
        },
        onError: (error) => {
            toast({
                title: "Join failed",
                description: error.message || "Wrong join code",
                variant: "destructive",
            });
        },
    });

    const content = (
        <Card className="h-full border-slate-700/50 bg-slate-900/50 transition-all hover:border-indigo-500/50 hover:bg-slate-900/80">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-white group-hover:text-indigo-400">
                        {course.title}
                    </CardTitle>
                    {/* <Badge
                        variant="secondary"
                        className="bg-indigo-500/20 text-indigo-400"
                    >
                        {course.joinCode}
                    </Badge> */}
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                    {course.description ?? "No description"}
                </p>
                <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                            {new Date(course.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    {course.teacherRole === "teacher" && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{course.teacherName ?? "Teacher"}</span>
                            <UserAvatar
                                size="xs"
                                name={course.teacherName ?? "Teacher"}
                                imageUrl={course.teacherImage ?? ""}
                            />
                        </div>
                    )}
                </div>
                {(isStudent && isEnrolled) || (isStudent && !isEnrolled) ? (
                    <div className="mt-3 flex justify-end">
                        {isStudent && isEnrolled && (
                            <Link
                                href={`/course/${course.id}`}
                                className="text-xs font-semibold text-emerald-300"
                            >
                                Enrolled
                            </Link>
                        )}
                        {isStudent && !isEnrolled && (
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-8 gap-2 text-indigo-300 hover:text-indigo-200"
                                    type="button"
                                >
                                    Enroll
                                    <ArrowRight className="h-3 w-3" />
                                </Button>
                            </DialogTrigger>
                        )}
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );

    if (!isStudent) {
        return (
            <Link href={`/course/${course.id}`} className="group">
                {content}
            </Link>
        );
    }

    if (isEnrolled) {
        return (
            <Link href={`/course/${course.id}`} className="group">
                {content}
            </Link>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="group">{content}</div>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Join Course</DialogTitle>
                    <DialogDescription>
                        Enter the join code to enroll in {course.title}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <Label htmlFor={`join-code-${course.id}`}>Join Code</Label>
                    <Input
                        id={`join-code-${course.id}`}
                        value={joinCode}
                        onChange={(e) =>
                            setJoinCode(e.target.value.toUpperCase())
                        }
                        placeholder="ABC123"
                    />
                </div>
                <DialogFooter>
                    <Button
                        onClick={() =>
                            enroll.mutate({
                                courseId: course.id,
                                joinCode,
                            })
                        }
                        disabled={!joinCode.trim() || enroll.isPending}
                    >
                        {enroll.isPending ? "Joining..." : "Join Course"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
