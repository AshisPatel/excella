import { gql } from "@apollo/client";

// User mutations
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email 
        }
    }
}
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

// Task Mutations
export const ADD_TASK = gql`
mutation addTask($username: String!, $taskContent: String!, $category: String!, $complete: Boolean!) {
    addTask(username: $username, taskContent: $taskContent, category: $category, complete: $complete) {
        username, 
        _id,
        category,
        taskContent,
        complete
    }
}
`;

export const UPDATE_TASK = gql`
mutation updateTask($_id: ID!, $taskContent: String!, $category: String!, $complete: Boolean!) {
    updateTask(_id: $_id, taskContent: $taskContent, category: $category, complete: $complete) {
        _id,
        username,
        category,
        taskContent,
        complete
    }
}
`;

export const DELETE_TASK = gql`
mutation deleteTask($_id: ID!){
    deleteTask(_id: $_id) {
        _id,
        taskContent,
        category
    }
}
`;

export const DELETE_ALL_TASKS = gql`
mutation deleteAllTasks($username: String!) {
    deleteAllTasks(username: $username) {
        deletedCount 
    }
}
`;

export const DELETE_COMPLETED_TASKS = gql`
mutation deleteCompletedTasks($username: String!) {
    deleteCompletedTasks(username: $username) {
        deletedCount
    }
}`;

export const DELETE_TASKS_BY_CATEGORY = gql`
mutation deleteTasksByCategory($username: String!, $category: String!) {
    deleteTasksByCategory(username: $username, category: $category) {
        deletedCount
    }
}
`;


// Job Mutations
export const ADD_JOB = gql`
mutation addJob($username: String!, $jobTitle: String!, $employer: String!, $applicationStatus: String!, $lastUpdated: String!) {
    addJob(username: $username, jobTitle: $jobTitle, employer: $employer, applicationStatus: $applicationStatus, lastUpdated: $lastUpdated) {
        _id
        jobTitle
        employer
        lastUpdated
        applicationStatus
        username
    }
}
`;

export const DELETE_JOB = gql`
mutation deleteJob($_id: ID!) {
    deleteJob(_id: $_id) {
        _id
        jobTitle
    }
}
`;

export const UPDATE_JOB = gql`
mutation updateJob($_id: ID!, $jobTitle: String!, $employer: String!, $applicationStatus: String!, $lastUpdated: String! ) {
    updateJob(_id: $_id, jobTitle: $jobTitle, employer: $employer, applicationStatus: $applicationStatus, lastUpdated: $lastUpdated) {
        _id
        jobTitle
        employer
        lastUpdated
        applicationStatus
        contacts {
            firstName
            lastName
            phone
            email
        }
    }
}
`;

export const ADD_CONTACT = gql`
mutation addContact($_id: ID!, $firstName: String!, $lastName: String!, $email: String, $phone: String) {
    addContact(_id: $_id, firstName: $firstName, lastName: $lastName, email: $email, phone: $phone) {
        _id,
        contacts {
            _id, 
            firstName,
            lastName,
            phone,
            email 
        }
    }
}
`;

export const UPDATE_CONTACT = gql`
mutation updateContact($_id: ID!, $firstName: String!, $lastName: String!, $email: String, $phone: String) {
    updateContact(_id: $_id, firstName: $firstName, lastName: $lastName, email: $email, phone: $phone) {
        _id,
        firstName,
        lastName,
        phone,
        email 
    }
}
`;

export const DELETE_CONTACT = gql`
mutation deleteContact($_id: ID!) {
    deleteContact(_id: $_id) {
        _id,
        contacts {
            _id
        }
    }
}
`;