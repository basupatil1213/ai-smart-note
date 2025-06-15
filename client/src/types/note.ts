

type Note = {
    id: string;
    userId: string;
    title: string;
    content: string;
    summary?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type { Note };