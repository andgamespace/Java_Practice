// src/types/types.ts

export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate: string; // ISO date string
    area?: string;
    priority?: 'low' | 'medium' | 'high';
}

export interface TaskFormData {
    title: string;
    description?: string;
    dueDate: string; // ISO date string
    area?: string;
    priority?: 'low' | 'medium' | 'high';
}