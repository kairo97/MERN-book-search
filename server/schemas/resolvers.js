const { Book, Author, User } = require('../models');

const resolvers = {
    Query: {
        books: async () => {
            return await Book.find({}).populate("books")
        },
        singleBook: async () => {
            return await Book.findById({}).populate('books')
        },
        users: async () => {
            return await User.find({}).populate('users')
        },
        singleUser: async () => {
            return await User.findById({}).populate('users')
        }
   
        },
    Mutation:{
        addBook: async (parent, args) => {
        return await Book.create(args)
        },
        editBook: async (parents, args) => {
            return await Book.findByIdAndUpdate(args.bookId, args, {new:true})
        },
        removeBook: async (parent, args) => {
            return await Book.destroy(args.bookId, args)
        },
        addUser: async (parent, args) => {
            return await User.create(args)
        },
        editUser: async (parent, args) => {
            return await User.findByIdAndUpdate(args.userId, args, {new:true})
        },
        removeUser: async (parent, args) => {
            return await User.destroy(args.userId, args)
        }
    }
}

module.exports = resolvers;