import { Dayjs } from 'dayjs';

export interface Liputuspaiva {
    name: string;
    date: string | Dayjs;
    description: string;
    official: boolean;
    links: string[];
}

export interface ApiResponse {
    data?: Liputuspaiva[];
    message?: string;
    count?: number;
    date?: string;
    weekRange?: {
        start: string;
        end: string;
    };
    month?: string;
    error?: string;
}