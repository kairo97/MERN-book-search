const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Define the Book input type
const BookInputType = new GraphQLInputObjectType({
  name: 'BookInput',
  fields: {
    authors: { type: GraphQLList(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    bookId: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    link: { type: GraphQLString },
    title: { type: GraphQLNonNull(GraphQLString) },
  },
});

// Define the User type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    savedBooks: { type: GraphQLList(BookType) },
    bookCount: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: (user) => user.savedBooks.length,
    },
  },
});

// Define the Query type
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // Define a field to get a user by ID
    getUserById: {
      type: UserType,
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = await User.findById(args._id);
        return user;
      },
    },
  },
});

// Define the Mutation type
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Define a field to create a new user
    createUser: {
      type: UserType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(args.password, saltRounds);
        const newUser = new User({
          username: args.username,
          email: args.email,
          password: hashedPassword,
        });
        const result = await newUser.save();
        return result;
      },
    },
    // Define a field to add a book to a user's savedBooks array
    addBook: {
      type: UserType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLString) },
        book: { type: GraphQLNonNull(BookInputType) },
      },
      resolve: async (parent, args) => {
        const updatedUser = await User.findByIdAndUpdate(
          args.userId,
          { $push: { savedBooks: args.book } },
          { new: true }
        );
        return updatedUser;
      },
    },
  },
});

// Define the overall GraphQL schema
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

module.exports = schema;
