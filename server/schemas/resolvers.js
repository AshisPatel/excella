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
      jobs: async (parent, { username }) => {
        //allow for GET jobdata based on username
        const params = username ? { username } : {};
        return Job.find(params)
      }
    },
    Mutation: {
      addJob: async(parent, args) => {
        const job = await Job.create(args)
      }
    }
  };

module.exports = resolvers