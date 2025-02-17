import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { Task } from '../../types/types';
import { Edit, Delete, AccessTime, Flag } from '@mui/icons-material';

const StyledCard = styled(Card)<{ expanded?: boolean }>(({ theme, expanded }) => ({
    margin: theme.spacing(1),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: expanded ? 'scale(1.02)' : 'scale(1)',
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
}));

const priorityColors = {
    1: '#f44336',
    2: '#ff9800',
    3: '#4caf50',
};

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <StyledCard expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {task.title}
                </Typography>
                {expanded && (
                    <>
                        <Typography variant="body2" color="text.secondary">
                            {task.description}
                        </Typography>
                        {task.notes && (
                            <Typography variant="body2" color="text.secondary">
                                Notes: {task.notes}
                            </Typography>
                        )}
                    </>
                )}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                    <Chip
                        icon={<AccessTime />}
                        label={format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        size="small"
                        style={{ marginRight: 8 }}
                    />
                    <Chip
                        icon={<Flag />}
                        label={`Priority ${task.priority}`}
                        size="small"
                        style={{ backgroundColor: priorityColors[task.priority as keyof typeof priorityColors] }}
                    />
                    <div style={{ marginLeft: 'auto' }}>
                        <IconButton size="small" onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}>
                            <Edit />
                        </IconButton>
                        <IconButton size="small" onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }}>
                            <Delete />
                        </IconButton>
                    </div>
                </div>
            </CardContent>
        </StyledCard>
    );
};