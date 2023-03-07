const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id:ID
        title:String
        description:String
        image:String
        link:String
        author:[Author]
    }
    type User {
        _id:ID 
        username:String
        email:String
        password:String

    }
    type Query{
        Book:[Book]
        User: [User]
    }

    type Mutation{
        addBook:(name:string!, author:string! ):Book
    }
    `
module.exports = typeDefs;