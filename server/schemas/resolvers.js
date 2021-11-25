const { User, Job } = require('../models');
//import custom scalar resolver to format date-time responses in a human-readable format
const { GraphQLDateTime } = require('graphql-iso-date');


const resolvers = {
    Date: GraphQLDateTime,
    Query: {
      users: async () => {
          return User.find()
      },
      test: async () => {
        return 'This is a test'
      },
      jobs: async () => {
        return Job.find()
      }
    }
  };

module.exports = resolvers