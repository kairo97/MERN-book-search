import { gql } from "@apollo/client";

export const SEARCH_BOOKS = gql`
query SearchBooks($searchTerm: String!) {
  searchBooks(searchTerm: $searchTerm) {
    bookId
    title
    authors
    description
    image
    link
  }
}
`;
export const QUERY_SAVED_BOOK_ID = gql`
    query singleBook($bookId: ID!) {
        book(bookId: $bookId) @client{
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
        users @client{
            _id
            username
            email

        }
    }`

export const  QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userId: $userId) @client{
            _id
            username
            email
        }
    }`