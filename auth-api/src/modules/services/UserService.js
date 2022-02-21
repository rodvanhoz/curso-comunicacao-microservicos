const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const httpStatus = require("../../config/constants/httpStatus");
const UserException = require("../user/exceptions/UserException").UserException;
const UserRepository = require("../repositories/UserRepository");
const secrets = require("../../config/constants/secrets");

class UserService {

    async findByEmail(req) {
        try {
            const {email} = req.params;
            const {authUser} = req;
            this.validateRequestData(email);
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            this.validateAuthenticatedUser(user, authUser);
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
            };
        }
    }

    validateRequestData(email) {
        if (!email) {
            throw new UserException(httpStatus.BAD_REQUEST, "User email is not informed");
        }
    }

    validadeUserNotFound(user) {
        if (!user) {
            throw new UserException(httpStatus.BAD_REQUEST, "User was not found");
        }
    }

    validateAuthenticatedUser(user, authUser) {
        if (!authUser || user.id !== authUser.id) {
            throw new UserException(httpStatus.FORBIDEN, "You cannot see this user data");
        }
    }

    async getAccessToken(req) {
        try {
            const {email, password} = req.body;
            this.validateAccessToken(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            this.validatePassword(password, user.password);
            const authUser = {id: user.id, name: user.name, email: user.email};
            const accesToken = jwt.sign({authUser}, secrets.API_SECRET, {expiresIn: "1d",});
            return {
                status: httpStatus.SUCCESS,
                accesstoken: accesToken,
            };
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
            };
        }
    }

    validateAccessToken(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Email and password must be informed")
        };
    }
    
    validatePassword(password, hashPassword) {
        if (!bcrypt.compare(password, hashPassword)) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Incorrect Password");
        }
    }
}

module.exports = new UserService();