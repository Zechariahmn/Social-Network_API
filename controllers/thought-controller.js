const { Thought, User } = require('../models');

const thoughtController = {

    // the get All Thoughts method gets all thoughts shared by users
    getAllThoughts(req, res) {
      Thought.find({})
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },

    //get one thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
           .select('-__v')
           .sort({ _id: -1 })
           .then(dbThoughtData => res.json(dbThoughtData))
           .catch(err => {
               console.log(err);
               res.status(500).json(err)
           })
    },