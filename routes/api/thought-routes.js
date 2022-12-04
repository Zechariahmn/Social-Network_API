const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//GET all and POST thought
router.route('/').get(getThought).post(createThought);

//GET one thought, PUT and DELETE by id
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//POST new reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

//DELETE reaction by id
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;