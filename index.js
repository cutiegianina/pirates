import express from 'express';
import { StatusCode } from './constants/status-codes.js';

const app = express();
app.use(express.json());


const users = {
    "Users": [ 
        { 
            "id": 1,
            "name": "Richard",
            "gender": "Male"
        },
        {
            "id": 2,
            "name": "Luffy",
            "gender": "Male"
        },
        {
            "id": 3,
            "name": "Nami",
            "gender": "Female"
        },
        {
            "id": 2,
            "name": "Sanji",
            "gender": "Male"
        },
        {
            "id": 4,
            "name": "Robin",
            "gender": "Female"
        }
    ]
};

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

const userData = createHashMap(users.Users);

app.get('/', (req, res) => res.send('Express on vercel!'));

app.get('/get-pirates', async (req, res) => { 
    const response = Object.values(userData);
    if (response == null) {
        res.status(StatusCode.NotFound.code).end(StatusCode.NotFound.statusPhrase);
        return;
    }
    var prettifyResponse = `<body style="background-color: #000;">
        <pre style="color: #fff;">${JSON.stringify(response, null, ' ')}</pre> </body>`;
    res.send(prettifyResponse); 
});

app.get('/get-pirate/:id', async (req, res) => {
    var user = userData[req.params.id];
    if (user == null) {
        res.status(StatusCode.NotFound.code).end(StatusCode.NotFound.statusPhrase);
        return;
    }
    res.send(user);
});

app.post('/create-pirate', (req, res) => {
    const newUser = req.body;
    userData[newUser.id] = newUser;
    res.send(newUser);
});

app.delete('/delete-pirate/:id', (req, res) => {
    if (userData[req.params.id] == null) {
        res.status(StatusCode.NotFound.code).end(StatusCode.NotFound.statusPhrase);
        return;
    }
    delete userData[req.params.id];
    res.send(StatusCode.Success.statusPhrase);
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server is running on port ${port}`)});