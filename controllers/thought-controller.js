const { User, Thought } = require('../models');

const ThoughtController = {
    // get all thoughts
    async getAllThoughts(req, res, err) {
        try{
            const dbThoughtData = await Thought.find();
            res.json(dbThoughtData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get a thought by id
    async getThoughtById({ params }, res, err) {
        try{
            const dbThoughtData = await Thought.findById({ _id: params.id });

            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create a thought
    async createThought({ body }, res, err) {
        try{
            const dbThoughtData = await Thought.create(body);

            const updateUser = await User.findByIdAndUpdate({ _id: body.userId }, { $push: { thoughts: dbThoughtData._id }}, { new: true, runValidators: true })

            if(!updateUser) {
                res.status(404).json({ message: 'No user found with this userId!' });
                return;
            }
            res.json(dbThoughtData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a thought by id
    async updateThought({ params, body }, res, err) {
        try{
            const dbThoughtData = await Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });

            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this userId!' });
                return;
            }
            res.json(dbThoughtData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete a thought by id
    async deleteThought({ params }, res, err) {
        try{
            const dbThoughtData = await Thought.findByIdAndDelete({ _id: params.id });

            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this userId!' });
                return;
            }
            res.json(dbThoughtData);
        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }
    }

}


module.exports = ThoughtController;