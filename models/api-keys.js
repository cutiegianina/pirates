import mongoose from 'mongoose';

export const apiKeys = new mongoose.Schema({
    key: String
}, { versionKey: false });