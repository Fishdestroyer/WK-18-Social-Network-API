const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thoughts-controller');

//API Thoughts
router
.route('/')
.get(getAllThoughts)
.post(addThoughts);

// /API/Thought/:id
router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought)


// /API/addReactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/reactionId')
.delete(deleteReaction);

module.exports = router