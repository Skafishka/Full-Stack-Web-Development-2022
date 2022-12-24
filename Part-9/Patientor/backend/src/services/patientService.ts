import patients from '../../data/patients';

import { NonSSNPatientsEntry } from '../types';

const getPatientEntries = (): NonSSNPatientsEntry[] => {
    return patients;
};

export default { getPatientEntries };