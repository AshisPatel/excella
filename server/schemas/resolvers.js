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
        const job = await Job.create(args);

        //User.findOneAndUpdate here... $push job to User jobs: []

          // .then(() => {
          //  return User.findOneAndUpdate(
          //    { userName: username },
          //    { $push: { jobs: { _id: jobId} } },
          //    { new: true },
          //  )
          // });

        return job;
      },
      deleteJob: async(parent,  jobId /* ,username */ ) => {
        const deletedJob = await Job.findOneAndDelete({ id_: jobId })
          //once User resolver is finished, will pass in username as well to update User

          // .then(() => {
          //  return User.findOneAndUpdate(
          //    { userName: username },
          //    { $pull: { jobs: { _id: jobId} } },
          //    { new: true },
          //  )
          // });

          return deletedJob;
      },
      // updateJob: async() => {

      // },
      // addContact: async() => {

      // },
      // updateContact: async() => {

      // }
    }
  };

module.exports = resolvers