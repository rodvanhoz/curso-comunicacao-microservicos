//import { Express } from "express";
//import * as db from "./src/config/db/initialData";

const express = require('express')
const db = require("./src/config/db/initialData")
const userRoutes = require("./src/modules/routes/UserRoutes");
const checkToken = require("./src/config/auth/checkToken");

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

db.createInitialData;

app.get('/api/status', (req, res) => {
    return res.status(200)
        .json({
            service: 'Auth-API',
            status: 'up',
            httpStatus: 200
        }
        )
})

app.use(express.json());
app.use(userRoutes);
app.use(checkToken);

app.listen(PORT, () => {
    console.info(`Server started successfuly at port ${PORT}`);
});