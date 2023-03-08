import { gql } from "@apollo/client";

export const QUERY_BOOKS = gql`
    query Books{
        books{
        _id
        title
        author
        image
        link
        }
    }
    ;`
export const QUERY_SINGLE_BOOK = gql`
    query singleBook($bookId: ID!) {
        book(bookId: $bookId) {
            _id
            title
            author
            image
            link
        }
    }
    ;`
export const QUERY_USERS = gql`
    query Users{
        users{
            _id
            username
            email

        }
    }`
export const  QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!){
        user(userId: $userId) {
            _id
            username
            email
        }
    }`