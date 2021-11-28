const { User, Job } = require('../models');
//import custom scalar resolver to format date-time responses in a human-readable format
const { GraphQLDateTime } = require('graphql-iso-date');
const { update } = require('../models/User');
const Task = require('../models/Task');


const resolvers = {
    Date: GraphQLDateTime,
    Query: {
      users: async () => {
        return User.find()
          .select('-__v -password')
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
      },     
      jobs: async (parent, { username }) => {
        //allow for GET jobdata based on username
        const params = username ? { username } : {};
        return Job.find(params);
      },
      singleJob: async (parent, { _id } ) => {
        console.log(__dirname);
        //search for a single Job based on it's _id
        return Job.findById({ _id: _id });
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
      deleteContact: async(parent, contactId) => {
        //update a specific contact by _id within a Job
        console.log('-----------contactId to Delete--------------');
        console.log(contactId);
        const updatedJob = await Job.findOneAndUpdate(
          { "contacts._id": contactId },
          { $pull: { contacts: { _id: contactId }}},
          {new: true, runValidators: true }
          );

          return updatedJob;
      },
      updateContact: async(parent, { _id, ...updateArgs }) => {
        //update a specific contact by _id within a Job
        console.log('-----------updateArguments--------------');
        console.log(updateArgs);
        const updatedJob = await Job.findOneAndUpdate(
          { "contacts._id": _id },
          { "$set":{
              "contacts.$.firstName": updateArgs.firstName,
              "contacts.$.lastName": updateArgs.lastName,
              "contacts.$.email": updateArgs.email,
              "contacts.$.phone": updateArgs.phone
            } 
          },
          {new: true, runValidators: true }
          );

        console.log('-----------updatedJob--------------');
        console.log(updatedJob);
        
        let contactsArray = updatedJob.contacts;

        //filter through contacts array to find the contact that was updated by the mutation
        let updatedContact = contactsArray.filter(contact => {
          if(contact._id.toString() === _id.toString()){
            return true;
          } else {
            return false;
          }
        }).map(contact => {
          console.log('-----------updatedContact--------------');
          console.log(contact);
          return contact;
        })

        return updatedContact[0];
      }
    }
};

module.exports = resolvers