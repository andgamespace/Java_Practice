import { create } from 'zustand';
import { Task, TaskFormData } from '../types/types';
import axios from 'axios';

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: TaskFormData) => Promise<void>;
    updateTask: (id: string, task: TaskFormData) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get<Task[]>('/api/tasks');
            set({ tasks: response.data, error: null, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch tasks', isLoading: false });
        }
    },

    addTask: async (task: TaskFormData) => {
        try {
            const response = await axios.post<Task>('/api/tasks', task);
            set((state) => ({ tasks: [...state.tasks, response.data] }));
        } catch (error) {
            set({ error: 'Failed to add task' });
        }
    },

    updateTask: async (id: string, task: TaskFormData) => {
        try {
            const response = await axios.put<Task>(`/api/tasks/${id}`, task);
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? response.data : t))
            }));
        } catch (error) {
            set({ error: 'Failed to update task' });
        }
    },

    deleteTask: async (id: string) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id)
            }));
        } catch (error) {
            set({ error: 'Failed to delete task' });
        }
    }
}));