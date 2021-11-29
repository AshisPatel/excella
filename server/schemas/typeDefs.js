const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    type Auth {
        token: ID!
        user: User
    }
    
    type User {
        _id: ID
        username: String
        password: String
        email: String
        jobs: [Job]
        tasks: [Task]
    }

    enum TaskCategory {
        DO
        DELEGATE
        DO_LATER
        DELETE
    }
    
    type Task {
        _id: ID,
        category: TaskCategory,
        taskContent: String,
        createdAt: String,
        complete: Boolean
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
        me: User
        users: [User]
        user(username: String!): User
        tasks(username: String!): Task
        task( _id: ID!): Task
        jobs(username: String): [Job]
        singleJob(_id: ID!): Job
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addTask(username: String!, taskContent: String!, category: String!, complete: Boolean!): Task
        deleteTask(_id: ID!): Task
        updateTask(_id: ID!): Task
        addJob(username: String!, jobTitle: String!, employer: String!, applicationStatus: String!, lastUpdated: String!): Job
        deleteJob(_id: ID!): Job
        updateJob(_id: ID!, jobTitle: String, employer: String, applicationStatus: String, lastUpdated: String): Job
        addContact(_id: ID!, firstName: String!, lastName: String! email: String!, phone: String!): Job
        deleteContact(_id: ID!): Job
        updateContact(_id: ID!, firstName: String, lastName: String, email: String, phone: String): Contact
    }
`

module.exports = typeDefs