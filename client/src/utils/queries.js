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