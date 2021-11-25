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
        jobs(username: String): [Job]
    }

    type Mutation {
        addJob(username: String!, jobTitle: String!, applicationStatus: String!): Job
        deleteJob(_id: ID!): Job
    }
`
//to be added to mutations
// updateJob(_id: ID!): Job
// addContact(): Contact
// updateContact(): Contact

module.exports = typeDefs