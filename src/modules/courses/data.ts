import type { ExplorerItem } from "./types";

export const mockDriveData: ExplorerItem[] = [
    {
        id: "f1",
        name: "Science",
        type: "folder",
        updatedAt: "Feb 5, 2026",
        children: [
            {
                id: "f1-1",
                name: "Quantum Physics",
                type: "folder",
                updatedAt: "Feb 7, 2026",
                children: [
                    {
                        id: "p1",
                        name: "Quantum_Theory.pdf",
                        type: "file",
                        size: "2.4 MB",
                        updatedAt: "Today",
                    },
                ],
            },
            {
                id: "s1",
                name: "Biology_Basics.pdf",
                type: "file",
                size: "12 MB",
                updatedAt: "Feb 6, 2026",
            },
        ],
    },
    {
        id: "f2",
        name: "Mathematics",
        type: "folder",
        updatedAt: "Jan 20, 2026",
        children: [],
    },
];
