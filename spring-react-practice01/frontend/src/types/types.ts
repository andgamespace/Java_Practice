export interface Task {
    id: string;
    title: string;
    description: string;
    notes?: string;
    dueDate: string;
    reminderTime?: string;
    priority: 1 | 2 | 3;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    projectId?: string;
    areaId?: string;
    createdAt: string;
    updatedAt: string;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;