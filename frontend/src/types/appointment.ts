import type{ PatientInterface } from "./patient";
import type{ PsychologistInterface } from "./psychologist";

interface AppointmentInterface {
    id: number;
    date: string;
    patient_id: number;
    psychologist_id: number;
    patient: PatientInterface;
    psychologist: PsychologistInterface;
    created_at: string;
    updated_at: string;
}

export { type AppointmentInterface }