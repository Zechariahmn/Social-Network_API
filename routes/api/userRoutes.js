const router = require('express').Router();

const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getUser)
.post(createUser);


//GET one user, PUT and DELETE by user's ID
router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//POST and DELETE a friend by ID
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;