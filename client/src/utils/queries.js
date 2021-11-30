import { gql } from '@apollo/client';

export const QUERY_JOBS = gql`
query jobs($username: String) {
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