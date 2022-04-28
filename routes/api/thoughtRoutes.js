// current route http://localhost:3001/api/thoughts
const { Thought, User, Reaction} = require('../../models');

const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController')

//api/thoughts/
router.route('/').get(getThoughts).post(createThought);

//api/thoughts/:thoughtId
router.route('/:userId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:userId/friends/:friendId').post(addReaction).delete(removeReaction);

module.exports = router;

