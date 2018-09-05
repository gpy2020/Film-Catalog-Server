const mongoose = require("mongoose");
require("mongoose-type-url");

const filmSchema = new mongoose.Schema({
  // add length validation
  title: {
    type: String,
    required: true,
    unique: true,
    text: true
  },
  // add length validation
  description: {
    type: String,
    required: true
  },
  avatar: {
    required: true,
    type: mongoose.SchemaTypes.Url
  },
  // add length validation
  galery: {
    required: true,
    type: [mongoose.SchemaTypes.Url]
  },
  rating: {
    type: Number
  },
  category: {
    type: String
  },
  comments: {
    type: [{ user: String, comment: String }],
    required: true
  }
});

filmSchema.path("title").validate(title => {
  return title && title.length > 2;
}, "Title must be longer than 2 symbols");

filmSchema.path("description").validate(desc => {
  return desc && desc.length > 3 && desc.length < 500;
}, "Description must be between 2 and 500 symbols");

filmSchema.path("galery").validate(galery => {
  return galery && galery.length > 3;
}, "Galery must contain 4 or more images");
module.exports = mongoose.model("Film", filmSchema);
