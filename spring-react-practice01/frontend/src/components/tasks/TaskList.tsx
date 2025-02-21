// src/components/TaskList.tsx
import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';
import { useTaskStore } from '../store/taskStore';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
    const { tasks, isLoading, error, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                backgroundColor: 'grey.900',
                color: 'white',
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Todo List
            </Typography>
            {tasks.length === 0 ? (
                <Typography color="grey.500">
                    No tasks yet. Add your first task!
                </Typography>
            ) : (
                <Box sx={{ mt: 2 }}>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </Box>
            )}
        </Paper>
    );
};

export default TaskList;