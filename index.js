import express from 'express';
import { StatusCode } from './constants/status-codes.js';
import { connectToDb } from './data/server.js';
import { userSchema } from './models/users.js'
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

//const run = require('./server.js');


// (async () => {
//     await connectToDb();
//     // Start your Express.js server logic here
// })();

// const User = mongoose.model('users', userSchema); // Create the model

// async function getAllUsers() {
//     console.log('Connection established');

//     const documents = await User.find();
//     console.log(documents);
//     console.log(JSON.stringify(documents));
// }

// await getAllUsers();

// ====== Initiate Database Connection ======

(async () => {
    try {
        await connectToDb();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process on connection failure
    }
})();


const User = mongoose.model('users', userSchema); // Create the model

async function getAllUsers() {
    try {
        console.log('Fetching all users...');
        const users = await User.find();
        if (users != null)
            return users;
        else
            return StatusCode.NotFound;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

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

// ==== API ENDPOINTS ====

app.get('/', (req, res) => res.send('Express on vercel!'));

app.get('/get-pirates', async (req, res) => { 
    const users = await getAllUsers();
    res.send(users); 
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