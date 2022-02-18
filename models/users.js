const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    addReaction,
    deleteThoughts,
    deleteReaction
} = require('../../controllers/thoughts-controller');

//API Thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThoughts)

// /API/Thought/:id
router
.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts);

// /API/addReactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/reactionId')
.delete(deleteReaction);

module.exports == router