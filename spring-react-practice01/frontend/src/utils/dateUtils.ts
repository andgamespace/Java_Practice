export interface Task {
    id: string;
    title: string;
    description: string;
    notes?: string;
    dueDate: Date;
    reminderTime?: Date;
    priority: 1 | 2 | 3;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    projectId?: string;
    areaId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskFormData extends Omit<Task, 'id' | 'createdAt' | 'updatedAt'> {
    id?: string;
}