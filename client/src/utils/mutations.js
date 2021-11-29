import { gql } from "@apollo/client";

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