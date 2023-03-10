const { Book, User } = require('../models');

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({});
    },
    singleBook: async (parent, args) => {
      return await Book.findById(args.bookId);
    },
    users: async () => {
      return await User.find({});
    },
    singleUser: async (parent, args) => {
      return await User.findById(args.userId);
    },
  },
  Mutation: {
    addBook: async (parent, args) => {
      return await Book.create(args);
    },
    editBook: async (parent, args) => {
      return await Book.findByIdAndUpdate(args.bookId, args, { new: true });
    },
    deleteBook: async (parent, args) => {
      return await Book.findByIdAndDelete(args.bookId);
    },
    addUser: async (parent, args) => {
      return await User.create(args);
    },
    editUser: async (parent, args) => {
      return await User.findByIdAndUpdate(args.userId, args, { new: true });
    },
    deleteUser: async (parent, args) => {
      return await User.findByIdAndDelete(args.userId);
    },
  },
};

module.exports = resolvers;
