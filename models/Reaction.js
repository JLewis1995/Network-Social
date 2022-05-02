const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

reactionSchema
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

module.exports = reactionSchema;
