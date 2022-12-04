const { User } = require('../models')

const userController = {
    //get all users
    getAllUsers(req,res) {
        User.find({})
        
        .populate({
            path: 'thoughts',
            select: '-__v'
         })
        
         .select('-__v')
        
         .then(dbUserData => res.json(dbUserData))
        
         .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
      },

      // the getUserById method will query a user using the user's id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      
    .populate({
        path: "thoughts",
        select: "-_v",
      })
      
      .select("-_v")
      
      .then((dbUserData) => {
        
        // when a user is not found by their id
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create User
  createUser({ body }, res) {
    User.create(body)
    
    .then(dbUserData => res.json(dbUserData))
    
    .catch(err => res.status(400).json(err));
},

 // the updateUser method updates a user by their id
 updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      
    .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      
      .catch((err) => res.status(400).json(err));
  },

  //delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    
    .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
    }
    res.json(dbUserData);
    })
    
    .catch(err => res.status(400).json(err))
},

