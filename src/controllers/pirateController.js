import express from 'express';
import { Pirate } from '../models/pirates.js'

const app = express.Router();

app.get('/get', async (req, res) => { 
    const pirates = await Pirate.find();
    res.send(pirates); 
});

app.get('/get/:id', async (req, res) => {
    const pirate = await Pirate.findById(req.params.id);
    res.send(pirate);
});

app.post('/create', async (req, res) => {
    const response = await Pirate.create(req.body);
    res.send(response);
});

app.put('/update/:id', async (req, res) => {
    const response = await Pirate.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    res.send(response);
});

app.delete('/delete/:id', async (req, res) => {
    const response = await Pirate.findByIdAndDelete(req.params.id);
    res.send(response);
});

export default app;