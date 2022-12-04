const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//imports the routes from the user and thought route files in the api folder
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;