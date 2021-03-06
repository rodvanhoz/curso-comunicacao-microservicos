//import Bcrypt from "bcrypt";
// import User from "../../modules/user/model/User";
const User = require('../../modules/user/model/User')
const Bcrypt = require('bcrypt')

async function createInitialData() {
    try {
        await User.sync({force: true});

        let password = await Bcrypt.hash("123456", 10);
    
        await User.create({
            name: "User Test 1",
            email: "test1@test.com.br",
            password: password,
        });

        await User.create({
            name: "User Test 2",
            email: "test2@test.com.br",
            password: password,
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = createInitialData();