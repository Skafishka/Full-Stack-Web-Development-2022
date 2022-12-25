/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
//import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientEntries());
});

router.post('/',(req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        //const newPatientEntry = toNewPatientEntry(req.body);
        //const addedEntry = patientService.addPatient(newPatientEntry);
        const addedEntry = patientService.addPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        });
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;