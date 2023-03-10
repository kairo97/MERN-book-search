import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
    mutation addBook($bookId: ID!, $title: String!, $author: String!, $description: String!) {
        addBook(bookId:$bookId, title: $title, author: $author, description: $description) @client{
            _id
            title
            author
            description 
        }
    }
`;
export const EDIT_BOOK = gql`
    mutation editBook($bookId: ID!, $title: String!, $author: String!, $description: String!) {
        editBook(bookId:$bookId, title:$title, author:$author, description:$description) @client {
            _id
            title
            author
            description
        }
    }
`;
export const REMOVE_BOOK_ID = gql`
    mutation deleteBook($bookId: ID!, $title: String!, $author: String!, $description: String!) {
        deleteBook(bookId:$bookId, title:$title, author:$author, description:$description) @client {
            _id
            title
            author
            description
        }
    }`
;
export const SAVE_BOOK_ID = gql`
    mutation saveBook($bookId: ID!, $title: String!, $author: String!, $description: String!) {
        saveBook(bookId:$bookId, title:$title, author:$author, description:$description) @client {
            _id
            title
            author
            description
        }
    }
`;

export const ADD_PROFILE = gql`
    mutation addProfile($profileId: ID!, $username: String!, $password: String!) {
            addProfile(profileId: $profileId, username:$username, password:$password) @client {
                _id
                username
                email
                password
            }
    }
`;
export const EDIT_PROFILE = gql`
    mutation editProfile($profileId: ID!, $username: String!, $email: String!, $password: String! ) {
        editProfile(profileId: $profileId, username: $username, email:$email, password:$password) @client {
            _id
            username
            email
            password
        }
    }`
;
export const DELETE_PROFILE = gql`
    mutation deleteProfile($profileId: ID!, $username: String!, $email: String!, $password: String! ) {
        deleteProfile(profileId: $profileId, username: $username, email:$email, password:$password) @client {
            _id
            username
            email
            password
        }
    }`
;