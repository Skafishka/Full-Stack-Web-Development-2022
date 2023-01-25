import patients from '../../data/patients';
import { NonSSNPatientsEntry, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientEntries = (): NonSSNPatientsEntry[] => {
    return patients;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find(q => q.id === id);
    if (!patient) {
        throw new Error('no patient');
    }
    return patient;
};

export default { getPatientEntries, addPatient, getPatient };