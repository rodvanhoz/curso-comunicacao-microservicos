//import Router from "express";
//import UserController from "../controllers/UserController";

const Router = require("express");
const UserController = require("../controllers/UserController");
const checkToken = require("../../config/auth/checkToken");


const router = new Router();

router.post('/api/user/email/auth', UserController.getAccessToken);

router.use(checkToken);
router.get('/api/user/email/:email', UserController.findByEmail);

module.exports = router;