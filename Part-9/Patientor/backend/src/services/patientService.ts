import patients from '../../data/patients';
import { NonSSNPatientsEntry, PatientsEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

//const id = uuid();

const getPatientEntries = (): NonSSNPatientsEntry[] => {
    return patients;
};

const addPatient = ( entry: NewPatientEntry ): PatientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default { getPatientEntries, addPatient };