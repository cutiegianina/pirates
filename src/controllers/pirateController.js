import express from 'express';
import { Pirate } from '../models/pirates.js'

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Richard\'s API!'));

router.get('/get', async (req, res) => { 
    const pirates = await Pirate.find();
    res.send(pirates); 
});

router.get('/get/:id', async (req, res) => {
    const pirate = await Pirate.findById(req.params.id);
    res.send(pirate);
});

router.post('/create', async (req, res) => {
    const response = await Pirate.create(req.body);
    res.send(response);
});

router.post('/update/:id', async (req, res) => {
    const response = await Pirate.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    res.send(response);
});

router.delete('/delete/:id', async (req, res) => {
    const response = await Pirate.findByIdAndDelete(req.params.id);
    res.send(response);
});

export default router;