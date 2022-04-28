const { Thought, User, Reaction} = require('../models');

module.exports = {

    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.userId })
        .select('__v')
        .then((thought) => 
        !thought ? res.status(400).json({ message: 'No Thought found with this Id' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {

    },
    updateThought(req, res) {

    },
    deleteThought(req, res) {

    },
    addReaction(req, res) {

    },
    removeReaction(req, res) {

    },
}