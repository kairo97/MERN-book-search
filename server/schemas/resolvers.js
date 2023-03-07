const { Book, Author, User } = require('../models');

const resolvers = {
    Query: {
        books: async () => {
            return await Book.find({}).populate("author")
        },
    authors: async () => {
        return await Author.find({}).populate('books')
    },
    singleAuthor: async () => {
        return await Author.findById({}).populate('books')
    }},
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
        addAuthor: async (parent, args) => {
            return await Author.create(args)
        }
}
}

module.exports = resolvers;