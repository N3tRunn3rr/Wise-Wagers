import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            }
    }
`;

export const QUERY_USER = gql`
    query getUser($username: String!) {
        user(username: $username) {
            _id
            username
            email
        }
    }
`;

export const QUERY_USER_BY_ID = gql`
    query getUserById($userId: ID!) {
        userById(userId: $userId) {
            _id
            username
            email
        }
    }
`;

