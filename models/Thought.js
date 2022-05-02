const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

thoughtSchema
.virtual("created")
.get(function () {
  const md = JSON.stringify(this.createdAt);
  const year = md.split('"')[1].split('-')[0];
  const month = md.split('"')[1].split('-')[1];
  const day = md.split('"')[1].split('-')[2].split('T')[0];
  const hour = md.split('T')[1].split(":")[0];
  const minute = md.split('T')[1].split(":")[1];
  return (`${month} ${day} ${year} at ${hour}:${minute} - wrong timezone but hey, it worked`);
})

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
