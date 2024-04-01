import { ApiKey } from "../models/api-keys.js";

export const authenticateAPIKey = async (req, res, next) => {
    await ApiKey
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