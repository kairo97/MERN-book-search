const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id:ID!
        title:String!
        description:String!
        image:String!
        link:String!
        author:String!
    }
    type User {
        _id:ID! 
        username:String!
        email:String!
        password:String!

    }
    type Query{
        Book:[Book]
        User: [User]
    }

    type Mutation{
        addBook:(title:String!, author:String!, description:String!, image:String!, link:String! ):Book
        editBook:(title:String!, author:String!, description:String!, image:String!, link:String! ):Book
        deleteBook:(title:String!, author:String!, description:String!, image:String!, link:String!):Book
        addUser:(username:String!, email:String!, password:String!):User
        editUser:(username:String!, email:String!, password:String!):User
        deleteUser:(username:String!, email:String!, password:String!):User
        
        } 
    `   ;
module.exports = typeDefs;