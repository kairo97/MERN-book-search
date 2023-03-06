const { gql } = require('apollo-server-express');
const { createUser, getSingleUser, saveBook, deleteBook, login } = require('../../controllers/user-controller');
const { authMiddleware } = require('../../utils/auth');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await getSingleUser({ user: context.user }, {});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async () => await User.find().populate('savedBooks'),
    user: async (parent, { username }) => await User.findOne({ username }).populate('savedBooks'),
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await createUser(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password!');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return await saveBook({ user: context.user }, { body: bookData });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await deleteBook({ user: context.user }, { params: { bookId } });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = { typeDefs, resolvers };
