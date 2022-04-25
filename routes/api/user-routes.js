const router = require('express').Router();
const { getAllUsers } = require('../../controllers/user-controller');


// GET and POST routes at 
router
    .route('/')
    .get(getAllUsers);

module.exports = router;