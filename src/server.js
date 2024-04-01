import express from 'express';
import http from 'http';
import cors from 'cors';
import { connectToDb } from './config/database.js';
import { authenticateAPIKey } from './middlewares/authorize.js';
import { globalErrorHandler } from './middlewares/error-handler.js';
import { pirateRouter } from './controllers/pirateController.js';

const app = express();

const server = http.createServer(app);

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api/pirates', pirateRouter);

//app.use(authenticateAPIKey);

app.use(globalErrorHandler);

server.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
    //await connectToDb();
});

server.on('listening', async () => {
    await connectToDb();
});

export default app;


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