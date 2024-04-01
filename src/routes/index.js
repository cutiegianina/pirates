import express from 'express';

const app = express.Router();

app.get('/', (req, res) => {
    res.redirect('/api');
 });

 app.get('/api', (req, res) => {
    res.send('Welcome to Richard\s API!');
 })
 
export default app;