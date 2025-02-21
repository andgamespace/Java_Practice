// src/api/taskApi.ts
import { Task, TaskFormData } from '../types/types';
import api from './axiosConfig';

export const taskApi = {
    getTasks: async (): Promise<Task[]> => {
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    },

    getTasksByDate: async (date: string): Promise<Task[]> => {
        const response = await api.get<Task[]>(`/tasks/date/${date}`);
        return response.data;
    },

    createTask: async (task: TaskFormData): Promise<Task> => {
        const response = await api.post<Task>('/tasks', task);
        return response.data;
    },

    updateTask: async (id: string, task: TaskFormData): Promise<Task> => {
        const response = await api.put<Task>(`/tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: string): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    },
};