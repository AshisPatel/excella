const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        userName: String
        email: String
    }

    type Query {
        users: [User]
        test: String
    }
`


module.exports = typeDefs