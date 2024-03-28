import express from 'express';
import { readFile } from 'fs/promises';
import { StatusCode } from './constants/status-codes.js';

const app = express();
//const router = express.Router();

app.use(express.json());
//app.use('/api/v1', router);


const users = await readFile('./data/users.json', 'utf-8');

const createHashMap = (data) =>  {
    const tempData = {};
    data.forEach(data => {
        const id = data.id;
        if (tempData[id]) {
            if (!Array.isArray(tempData[id])) {
                tempData[id] = [tempData[id]];
            }
            tempData[id].push(data);
        } else {
            tempData[id] = data;
        }
    });
    return tempData;
}

const jsonUserData = JSON.parse(users).Users;
const userData = createHashMap(jsonUserData);

app.get('/', (req, res) => res.send('Yo!'));

app.get('/get-users', async (req, res) => { 
    const response = Object.values(userData);
    if (response == null) {
        res.status(StatusCode.NotFound.code).end(StatusCode.NotFound.statusPhrase);
        return;
    }
    res.send(response); 
});

app.get('/get-user/:id', async (req, res) => {
    var user = userData[req.params.id];
    if (user == null) {
        res.status(StatusCode.NotFound.code).end(StatusCode.NotFound.statusPhrase);
        return;
    }
    res.send(user);
});

app.post('/create-user', (req, res) => {
    const newUser = req.body;
    userData[newUser.id] = newUser;
    res.send(newUser);
});

app.delete('/delete-user/:id', (req, res) => {
    if (userData[req.params.id] == null) {
        res.status(StatusCode.NotFound.code).end(StatusCode.NotFound.statusPhrase);
        return;
    }
    delete userData[req.params.id];
    res.send(StatusCode.Success.statusPhrase);
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server is running on port ${port}`)});