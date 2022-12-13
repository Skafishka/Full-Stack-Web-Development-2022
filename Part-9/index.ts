//import express from 'express';
import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get(`/bmi`, (_req, res) => {
    const { height, weight } = _req.query;
    const bmi = calculateBmi(Number(height), Number(weight));

    if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).send({error: 'malformatted parameteres'})
    } else {
        res.send({weight, height, bmi});
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})