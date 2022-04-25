const { User } = require('../models');

const UserController = {
    // get all users
    async getAllUsers(req,res) {
        try {
            const dbUserData = await User.find();
            res.json(dbUserData);
        }
        catch {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports = UserController;