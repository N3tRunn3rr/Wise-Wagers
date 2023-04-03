const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        user(id:ID!): User
        users: [User]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(id: ID!, email: String!, password: String!): User!
        deleteUser(id: ID!): User!
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
