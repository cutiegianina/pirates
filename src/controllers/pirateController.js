import express from 'express';
import { Pirate } from '../models/pirates.js'

export const pirateRouter = express.Router();

pirateRouter.get('/get', async (req, res) => { 
    const pirates = await Pirate.find();
    res.send(pirates); 
});

pirateRouter.get('/get/:id', async (req, res) => {
    const pirate = await Pirate.findById(req.params.id);
    res.send(pirate);
});

pirateRouter.post('/create', async (req, res) => {
    const response = await Pirate.create(req.body);
    res.send(response);
});

pirateRouter.post('/update/:id', async (req, res) => {
    const response = await Pirate.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    res.send(response);
});

pirateRouter.delete('/delete/:id', async (req, res) => {
    const response = await Pirate.findByIdAndDelete(req.params.id);
    res.send(response);
});