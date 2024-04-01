import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
    key: String
}, { versionKey: false });

export const ApiKey = mongoose.model('APIKey', apiKeySchema, 'api_keys');