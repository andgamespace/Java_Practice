import { Task, TaskFormData } from '../types/types';
import api from './axiosConfig';

export const taskApi = {
    getTasks: async () => {
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    },

    getTasksByDate: async (date: string) => {
        const response = await api.get<Task[]>(`/tasks/date/${date}`);
        return response.data;
    },

    createTask: async (task: TaskFormData) => {
        const response = await api.post<Task>('/tasks', task);
        return response.data;
    },

    updateTask: async (id: string, task: TaskFormData) => {
        const response = await api.put<Task>(`/tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: string) => {
        await api.delete(`/tasks/${id}`);
    },
};