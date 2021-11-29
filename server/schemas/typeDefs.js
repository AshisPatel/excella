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
        password: String
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
<<<<<<< HEAD
        addTask(taskContent: String!, category: String!, complete: Boolean!, username: String!): Task
=======
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
>>>>>>> 990204f81cabc552a6c46265fdd9285418b2ee4a
        addJob(username: String!, jobTitle: String!, employer: String!, applicationStatus: String!, lastUpdated: String!): Job
        deleteJob(_id: ID!): Job
        updateJob(_id: ID!, jobTitle: String, employer: String, applicationStatus: String, lastUpdated: String): Job
        addContact(_id: ID!, firstName: String!, lastName: String! email: String!, phone: String!): Job
        deleteContact(_id: ID!): Job
        updateContact(_id: ID!, firstName: String, lastName: String, email: String, phone: String): Contact
    }
`

module.exports = typeDefs