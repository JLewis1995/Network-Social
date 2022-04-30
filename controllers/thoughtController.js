const { Thought, User, Reaction } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No Thought found with this Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    //  {
    //  "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
    Thought.create(req.body)
      .then((thought) => {
       function addToUser(info) {
         User.findOneAndUpdate(
           { username: info.username },
           {$addToSet: { thoughts: info._id }},
           { new: true }
         )
         .catch((err) => console.log(err))
       }
       addToUser(thought)
        res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    // {
    //     "thoughtText": "updated text"
    // }
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    ).then((thought) =>
      !thought
        ? res.status(404).json({
            message: `no thought found with this id ${req.params.thoughtId}`,
          })
        : res.json(thought)
    )
  },
  deleteThought(req, res) {
    Thought.findByIdAndDelete({ _id: req.params.thoughtId }).then((thought) =>
      !thought
        ? res.status(404).json({
            message: `no thought found with this id ${req.params.thoughtId}`,
          })
        : res.json(thought)
    );
  },
  addReaction(req, res) {
    // {
    //     "reactionBody": "test reaction body",
    //     "username": "First Tester"
    // }
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    ).then((thought) =>
      !thought
        ? res.status(404).json({
            message: `no thought found with this id ${req.params.thoughtId}`,
          })
        : res.json(thought)
    );
  },
  removeReaction(req, res) {
    // {
    //     "reactionId": "626c6f93dc894975d4078dd4"
    // }
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    ).then((thought) =>
      !thought
        ? res.status(404).json({
            message: `no thought found with this id ${req.params.thoughtId}`,
          })
        : res.json(thought)
    );
  },
};
