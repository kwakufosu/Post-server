const Post = require('../models/post');

const resolvers = {
  Query: {
    greeting: () => 'Hello world',
    getAllPosts: async () => (posts = await Post.find()),
  },
};

module.exports = resolvers;
