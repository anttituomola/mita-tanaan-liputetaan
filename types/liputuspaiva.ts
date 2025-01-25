export interface Liputuspaiva {
    name: string;
    date: string;
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
}