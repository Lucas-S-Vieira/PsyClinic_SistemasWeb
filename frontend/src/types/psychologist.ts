interface PsychologistInterface {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    _count?: {
        appointments: number;
    };
}

export { type PsychologistInterface };