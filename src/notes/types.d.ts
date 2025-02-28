export interface Note {
    id: number;
    noteListId: number;
    note: string;
    description: string;
    completed: boolean;
    expanded: boolean;
}
export interface NoteList {
    id: number;
    title: string;
}