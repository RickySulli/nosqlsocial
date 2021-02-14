const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
}

//(/api/thoughts)
//GET all thoughts
router
    .route('/')
    .get(getAllThoughts);
// GET/PUT/DELETE a single thought by it's _id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
//POST to create a new thought (don't forget to push the created thought's _id to the associated user's [thoughts] array field)
router
    .route('/:userId')
    .post(newThought);


//(/api/thoughts/:thoughtId/reactions)
//POST to create a reaction stored in a single thought's [reactions] array field
router
    .route('/:id/reactions')
    .post(newReaction);
//DELETE  to pull and remove a reaction by the reaction's reactionId value
router
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;