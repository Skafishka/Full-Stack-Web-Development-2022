/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientEntries());
});

router.post('/',(req, res) => {
    try {        
        const newPatientEntry = toNewPatientEntry(req.body);
        
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get(`/:id`, (req, res) => {
    const id = req.params.id;
    try {
        res.send(patientService.getPatient(id));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong!';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;