const jwt = require("jsonwebtoken");
const {promisify} = require("util");

const secrets = require("../constants/secrets");
const httpStatus = require("../../config/constants/httpStatus");
const AuthException = require("./AuthException").AuthException;

const bearer = "bearer ";

module.exports = async (req, res, next) => {
    try {    
        const {authorization} = req.headers;
        if (!authorization) {
            throw new AuthException(httpStatus.UNAUTHORIZED, "Access token was not informed");
        }

        let accesToken = authorization;

        if (accesToken.includes(bearer)) {
            accesToken = accesToken.split(" ")[1];
        }

        const decodes = await promisify(jwt.verify)(accesToken, secrets.API_SECRET);
        req.authUser = decodes.authUser;
        return next();
    } catch (err) {
        console.log("aqui ------> " + err.message);
        const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({status, message: err.message});
    }
};