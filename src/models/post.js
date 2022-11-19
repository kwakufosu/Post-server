const mongoose = require('mongoose');

const postModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

mongoose.model('post', postModel);

module.exports = postModel;
