export interface ToDo {
    id: Number|null;
    title: string;
    description: string;
    status: {
        onhold: boolean;
        inprogress: boolean;
        completed: boolean;
    };
}
