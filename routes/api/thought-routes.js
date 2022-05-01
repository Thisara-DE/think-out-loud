const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } = require('../../controllers/thought-controller')

// GET all and POST
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// GET and Update a thought
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


// POST or DELETE a reaction at /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post()
    .delete();





module.exports = router;