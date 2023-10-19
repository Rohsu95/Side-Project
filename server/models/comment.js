const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  createdAt: { type: String, required: true },
  username: { type: String, required: true },
  creator: { type: String, required: true },
  image: { type: String, required: true },
  commentId: { type: String, required: true },
});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Comment", commentSchema);
