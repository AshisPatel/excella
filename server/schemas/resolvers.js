const { User, Job } = require('../models');
//import custom scalar resolver to format date-time responses in a human-readable format
const { GraphQLDateTime } = require('graphql-iso-date');
const { update } = require('../models/User');


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
        console.log(jobId);
        const deletedJob = await Job.findOneAndDelete({ _id: jobId });
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
      updateJob: async(parent, {_id, ...jobArgs} ) => {
        const updatedJob = await Job.findOneAndUpdate({ _id: _id  }, jobArgs, {new: true, runValidators: true });

        return updatedJob;
      },
      addContact: async(parent, {_id, ...contactArgs}) => {
        const newContact = await Job.findOneAndUpdate(
          { _id: _id }, 
          { $push: {contacts: contactArgs}}, 
          {new: true, runValidators: true }
          );
        
        return newContact;
      },
      updateContact: async(parent, { name, ...updateArgs }) => {
        //update a specific contact by name within a Job
        console.log(`Hello my name is ${name}`);
        console.log(updateArgs);
        const updatedJob = await Job.findOneAndUpdate(
          { "contacts.name": name },
          { "$set":{
              "contacts.$.email": updateArgs.email,
              "contacts.$.phone": updateArgs.phone
            } 
          },
          {new: true, runValidators: true }
          );

        console.log(updatedJob);
        return updatedJob.contacts[0];
      }
    }
  };

module.exports = resolvers