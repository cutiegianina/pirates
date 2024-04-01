import { StatusCode } from '../constants/status-codes.js';

export const globalErrorHandler = (err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(StatusCode.InternalServerError.code).json({ error: StatusCode.InternalServerError.statusPhrase });
}