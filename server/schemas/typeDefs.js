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
        firstName: String,
        lastName: String,
        email: String,
        phone: String
    }

    type Job {
        _id: ID
        jobTitle: String
        employer: String
        lastUpdated: Date
        applicationStatus: String
        username: String
        contacts: [Contact]
    }

    type Query {
        users: [User]
        test: String
        jobs(username: String): [Job]
        singleJob(_id: ID!): Job
    }

    type Mutation {
        addJob(username: String!, jobTitle: String!, employer: String!, applicationStatus: String!, lastUpdated: String!): Job
        deleteJob(_id: ID!): Job
        updateJob(_id: ID!, jobTitle: String, employer: String, applicationStatus: String, lastUpdated: String): Job
        addContact(_id: ID!, firstName: String!, lastName: String! email: String!, phone: String!): Job
        deleteContact(_id: ID!): Job
        updateContact(_id: ID!, firstName: String, lastName: String, email: String, phone: String): Contact
    }
`

module.exports = typeDefs