export type ExplorerItem = {
    id: string;
    name: string;
    type: "folder" | "file";
    size?: string;
    updatedAt: string;
    children?: ExplorerItem[];
};
