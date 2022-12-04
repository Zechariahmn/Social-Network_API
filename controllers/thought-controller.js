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

// creates a new thought for a specific user, using the createThought method
  createThought({ params, body }, res) {
    Thought.create(body)
      
    .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id." });
          return;
        }
        res.json({ message: "The thought was successfully created!" });
      })
      
      .catch((err) => res.json(err));
  },

  //add reaction
  addReaction ({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    )
    
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this ID!' });
            return;
        }
        res.json(dbThoughtData)
    })
    
    .catch(err => res.json(err));
},

// the delete Thought method removes a thought from a specific user by id
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
            
    .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            
            .catch((err) => res.status(400).json(err));
  },

  //update a thought by Id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id }, 
        body,
        { new: true, runValidators: true }
    )
    
    .then(updatedThought => {
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
    res.json(updatedThought);
    })
    
    .catch(err => res.json(err));
  },

//delete Reaction
removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
    
    .then(dbThoughtData => res.json(dbThoughtData))
    
    .catch(err => res.json(err));
 },
};



// exports the thoughtController
module.exports = thoughtController;