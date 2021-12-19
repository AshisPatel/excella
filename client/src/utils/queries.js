import { gql } from '@apollo/client';

// Task Queries
export const QUERY_TASKS = gql`
query tasks($username: String!) {
    tasks(username: $username) {
        _id
        category
        taskContent
        complete
        username
    }
}
`;


// Job Queries
export const QUERY_JOBS = gql`
query jobs($username: String!) {
    jobs(username: $username) {
        _id
        jobTitle
        employer
        lastUpdated
        applicationStatus
        username
    }
}
`;

export const QUERY_SINGLE_JOB = gql`
query singleJob($_id: ID!) {
    singleJob(_id:$_id) {
        _id
        jobTitle
        employer
        lastUpdated
        applicationStatus
        contacts {
            _id
            firstName
            lastName
            phone
            email 
        }
    }
}
`;

// Timer Queries
export const QUERY_ME = gql`
query me {
    me {
        username
        workTime
        breakTime
    }
}
`;