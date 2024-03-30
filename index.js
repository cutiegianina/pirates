import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { StatusCode } from './constants/status-codes.js';
import { connectToDb } from './data/server.js';
import { userSchema } from './models/users.js'
import { apiKeys } from './models/api-keys.js';

const app = express();
app.use(cors());
app.use(express.json());

// ==== Initiate Database Connection ====

(async () => {
    try {
        await connectToDb();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
})();

// ==== Database Schemas ====

const User = mongoose.model('users', userSchema);
const APIKeys = mongoose.model('api_keys', apiKeys);

// ==== Middlewares ====

const authenticateAPIKey = async (req, res, next) => {
    await APIKeys
        .findOne({ key: req.headers['key'] })
        .then(key => {
            if (key)
                next();
            else
                res.status(StatusCode.UnAuthorized.code).end(StatusCode.UnAuthorized.statusPhrase);
        })
        .catch(err => {
            res.status(StatusCode.BadRequest.code).end(StatusCode.BadRequest.statusPhrase);
        })
};

const globalErrorHandler = (err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
}

app.use(authenticateAPIKey);
app.use(globalErrorHandler);

// ==== API ENDPOINTS ====

app.get('/', (req, res) => res.send('Welcome to Richard\'s API!'));

app.get('/get-pirates', async (req, res) => { 
    const users = await User.find();
    res.send(users); 
});

app.get('/get-pirate/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user == null) {
        res.status(StatusCode.NotFound.code).end(StatusCode.NotFound.statusPhrase);
        return;
    }
    res.send(user);
});

app.post('/create-pirate', async (req, res) => {
    var response = await User.create(newUser);
    res.send(response);
});

app.post('/update-pirate/:id', async (req, res) => {
    var response = await User.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    res.send(response);
});

app.delete('/delete-pirate/:id', async (req, res) => {
    var response = await User.findByIdAndDelete(req.params.id);
    res.send(response);
});

const port = process.env.PORT;
app.listen(port, () => { console.log(`Server is running on port ${port}`)});


// const createHashMap = (data) =>  {
//     const tempData = {};
//     data.forEach(data => {
//         const id = data.id;
//         if (tempData[id]) {
//             if (!Array.isArray(tempData[id])) {
//                 tempData[id] = [tempData[id]];
//             }
//             tempData[id].push(data);
//         } else {
//             tempData[id] = data;
//         }
//     });
//     return tempData;
// }

// const userData = createHashMap(users.Users);