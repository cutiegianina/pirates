import express from 'express';
import http from 'http';
import cors from 'cors';
import { connectToDb } from './config/database.js';
import { authenticateAPIKey } from './middlewares/authorize.js';
import { globalErrorHandler } from './middlewares/error-handler.js';
import { pirateRouter } from './controllers/pirateController.js';

export const app = express();

const server = http.createServer(app);

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api/pirates', pirateRouter);

//app.use(authenticateAPIKey);

app.use(globalErrorHandler);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

server.on('listening', async () => {
    await connectToDb();
});
 


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