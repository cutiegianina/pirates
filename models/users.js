import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: String,
    gender: String
}, { versionKey: false });