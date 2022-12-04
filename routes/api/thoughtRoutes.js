const router = require('express').Router();
const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

//GET all and POST thought
router.route('/').get(getThought).post(createThought);

//GET one thought, PUT and DELETE by id
router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//POST new reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

//DELETE reaction by id
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;