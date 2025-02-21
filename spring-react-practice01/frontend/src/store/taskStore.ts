// src/store/taskStore.ts
import create from 'zustand';
import { Task, TaskFormData } from '../types/types';
import { taskApi } from '../api/taskApi';

interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (taskData: TaskFormData) => Promise<void>;
    updateTask: (id: string, taskData: TaskFormData) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,
    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await taskApi.getTasks();
            set({ tasks: data });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch tasks' });
        } finally {
            set({ isLoading: false });
        }
    },
    createTask: async (taskData) => {
        set({ isLoading: true, error: null });
        try {
            await taskApi.createTask(taskData);
            // Re-fetch tasks after creation
            const data = await taskApi.getTasks();
            set({ tasks: data });
        } catch (error: any) {
            set({ error: error.message || 'Failed to create task' });
        } finally {
            set({ isLoading: false });
        }
    },
    updateTask: async (id, taskData) => {
        set({ isLoading: true, error: null });
        try {
            await taskApi.updateTask(id, taskData);
            const data = await taskApi.getTasks();
            set({ tasks: data });
        } catch (error: any) {
            set({ error: error.message || 'Failed to update task' });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteTask: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await taskApi.deleteTask(id);
            const data = await taskApi.getTasks();
            set({ tasks: data });
        } catch (error: any) {
            set({ error: error.message || 'Failed to delete task' });
        } finally {
            set({ isLoading: false });
        }
    },
}));