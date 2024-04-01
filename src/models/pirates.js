import mongoose from 'mongoose';

const pirateSchema = new mongoose.Schema({
    name: String,
    gender: String
}, { versionKey: false });

export const Pirate = mongoose.model('Pirate', pirateSchema, 'pirates');