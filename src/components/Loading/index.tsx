import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
    className?: string;
}

const Loading: FC<LoadingProps> = ({ className }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={cn("h-full", className)}>
            <CircularProgress />
        </Box>
    );
};

export default Loading;