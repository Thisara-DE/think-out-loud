const { User, Thought } = require('../models');

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
    },
    
    // get a single user by ID
    async getUserById({ params }, res) {
        try{
            const dbUserData = await User.findById({ _id: params.id});

            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    // create a user
    async createUser({ body }, res, err) {
        try{
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a friend (/api/users/:userId/friends/:friendId)
    async addFriend({ params }, res) {
        try{
            const dbUserData = await User.findByIdAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId }}, { new: true, runValidators: true });

            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove a friend (/api/users/:userId/friends/:friendId)
    async removeFriend({ params }, res) {
        try{
            const dbUserData = await User.findByIdAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true });
            
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update a user
    async updateUser({ params, body }, res) {
        try{
            const dbUserData = await User.findByIdAndUpdate({ _id: params.id }, body, { new:true, runValidators: true });

            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete a user
    async deleteUser({ params }, res) {
        try{
            const dbUserData = await User.findByIdAndDelete({ _id: params.id });
            // const removeThoughts = await Thought.remove({ _id: { $in: User.Thought }})

            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    }
}

module.exports = UserController;