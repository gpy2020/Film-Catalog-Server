const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  films: {
    type: [String],
    required: true
  }
});

categorySchema.path("title").validate(title => {
  return title && title.length > 2;
});

categorySchema.path("description").validate(desc => {
  return desc;
});
module.exports = mongoose.model("Category", categorySchema);
