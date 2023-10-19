const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: String, required: true },
  createdAt: { type: String, required: true },
  username: { type: String, required: true },
  creator: { type: String, required: true },
  image: { type: String, required: true },
});
placeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Place", placeSchema);
