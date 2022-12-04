const router = require('express').Router();

// Imports all API routes from api folder index.js file
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;