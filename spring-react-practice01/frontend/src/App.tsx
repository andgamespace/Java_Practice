import { useState } from 'react';
import { CssBaseline, Container, ThemeProvider, createTheme, Typography } from '@mui/material';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { TaskList } from './components/tasks/TaskList';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Task Manager
                </Typography>

                {/* DayPicker Calendar */}
                <Typography variant="h6" gutterBottom>
                    Select a Day:
                </Typography>
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)} // Update the selected date
                />

                {/* Task List for the selected date */}
                <TaskList selectedDate={selectedDate} />
            </Container>
        </ThemeProvider>
    );
}

export default App;