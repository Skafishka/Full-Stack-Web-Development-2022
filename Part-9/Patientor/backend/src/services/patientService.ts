import patients from '../../data/patients';
import { NonSSNPatientsEntry, PatientsEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatientEntries = (): NonSSNPatientsEntry[] => {
    return patients;
};

const addPatient = ( entry: NewPatientEntry ): PatientsEntry => {
    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default { getPatientEntries, addPatient };