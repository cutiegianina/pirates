//import  { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import { config } from 'dotenv';

//const uri = "mongodb+srv://principebragi12:Duc3n%40123@cluster0.w1qtsog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
config();

export async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process on connection failure
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