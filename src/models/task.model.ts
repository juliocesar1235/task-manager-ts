export const TASK_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'ERROR'] as const;
export type TaskStatus = typeof TASK_STATUSES[number];


export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus
    createdAt: Date;
    updatedAt: Date;
}