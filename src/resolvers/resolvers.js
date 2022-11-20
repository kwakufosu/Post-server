const Post = require('../models/post');

const resolvers = {
  Query: {
    greeting: () => 'Hello world',
    getAllPosts: async () => (posts = await Post.find()),
    getPost: async (root, { id }) => {
      const post = await Post.findById(id);
      return post;
    },
  },

  Mutation: {
    createPost: async (root, { input }, context) => {
      const { title, description } = input;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },

    deletePost: async (_, { id }) => {
      const post = await Post.findById(id);
      await Post.findByIdAndDelete(id);
      return post;
    },

    updatePost: async (_, { id, input }) => {
      const { title, description } = input;
      const post = await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      return post;
    },
  },
};

module.exports = resolvers;
