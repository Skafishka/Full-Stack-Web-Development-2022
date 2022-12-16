//import express from 'express';
import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { printOut } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get(`/bmi`, (req, res) => {
    const { height, weight } = req.query;
    const bmi = calculateBmi(Number(height), Number(weight));

    if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).send({error: 'malformatted parameteres'});
    } else {
        res.send({weight, height, bmi});
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const daily_exercises = req.body.daily_exercises;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    if (!daily_exercises.length || daily_exercises.find((q: unknown) => isNaN(Number(q))) || isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    } else if (!daily_exercises || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return res.json(printOut(daily_exercises.map((q: unknown) => Number(q)), Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});