const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    type User {
        _id: ID
        userName: String
        email: String
        jobs: [Job]
    }

    type Contact {
        _id: ID
        name: String,
        email: String,
        phone: String
    }

    type Job {
        _id: ID
        jobTitle: String
        applicationDate: Date
        applicationStatus: String
        username: String
        contacts: [Contact]
    }

    type Query {
        users: [User]
        test: String
        jobs: [Job]
    }
`


module.exports = typeDefs