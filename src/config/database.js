import  { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      serverApi: ServerApiVersion.v1
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

// ==== Connect to MongoDB ==========
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// export async function connectToDb() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB!");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// }