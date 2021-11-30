const { User, Job } = require('../models');
//import GraphQL authentication error handling
const { AuthenticationError } = require('apollo-server-express');
//JWT function
const { signToken } = require('../utils/auth');
//import custom scalar resolver to format date-time responses in a human-readable format
const { GraphQLDateTime } = require('graphql-iso-date');
//const { update } = require('../models/User');
const { Types } = require('mongoose');


const resolvers = {
    Date: GraphQLDateTime,
    Query: {
      //==========================Me Query==================================================
      me: async (parent, args, context) => {
        if(context.user) {
          const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('jobs');
          //populate tasks here

          return userData;
        }

        throw new AuthenticationError('User not logged in!');

      },
      //==========================User Queries==================================================
      users: async () => {
          return User.find()
      },
      test: async () => {
        return 'This is a test'
      },
    //==========================Job Queries==================================================
      jobs: async (parent, { username }) => {
        //allow for GET jobdata based on username
        console.log('GETTING JOBS!');
        console.log({ username }); 
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
      //=========================User Mutations==============================================
      addUser: async (parent, args) => {
        const user = await User.create(args);
        //create JWT token
        const token = signToken(user);

        //return obj including user and token
        return { user, token };
      },
      //=======================Auth Mutation================================================
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if(!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { user, token };
      },
      //=======================Job Mutations===============================================
      addJob: async(parent, args, context) => {
        console.log('You are trying to add a job!');
        console.log(context.user);
        
        //if user is logged in, allow them to create a job
        if(context.user) {
          const job = await Job.create({...args, username: context.user.username});

          //update User with the added Job
          
          console.log('Here '+ context.user._id);

          _id = Types.ObjectId(context.user._id);

          console.log(_id.toString());

          console.log(_id);


            await User.findOneAndUpdate(
               { username: context.user.username },
               { $push: { jobs: { _id: job._id} } },
               { new: true },
             );
  
          return job;
        }

        throw new AuthenticationError('You need to be logged in to add a Job!');

      },
      deleteJob: async(parent, jobId, context ) => {

        //if user is logged in, allow them to delete a job
        if(context.user) {
          console.log(jobId);
          const deletedJob = await Job.findOneAndDelete({ _id: jobId });


            //once User resolver is finished, will pass in username as well to update User
            await User.findOneAndUpdate(
              { username: context.user.username },
              { $pull: { jobs: { _id: deletedJob._id} } },
              { new: true },
            );
  
            return deletedJob;
        }

        throw new AuthenticationError('You need to be logged in to delete a Job!')

      },
      updateJob: async(parent, {_id, ...jobArgs}, context ) => {

        //allow user to update a current job entry if logged in
        if(context.user) {
          const updatedJob = await Job.findOneAndUpdate({ _id: _id  }, jobArgs, {new: true, runValidators: true });

          return updatedJob;
        }

        throw new AuthenticationError('You need to be logged in to updated a Job!');

      },
      addContact: async(parent, {_id, ...contactArgs}, context) => {

        //if logged in, allow users to add a contact
        if(context.user) {
          const newContact = await Job.findOneAndUpdate(
            { _id: _id }, 
            { $push: {contacts: contactArgs}}, 
            {new: true, runValidators: true }
            );
          
          return newContact;
        }

        throw new AuthenticationError('You need to be logged in to add a Contact!');
      },
      deleteContact: async(parent, contactId, context) => {

        //if logged in, allow user to delete a current contact entry
        if(context.user) {
        //update a specific contact by _id within a Job
        console.log('-----------contactId to Delete--------------');
        console.log(contactId);
        const updatedJob = await Job.findOneAndUpdate(
          { "contacts._id": contactId },
          { $pull: { contacts: { _id: contactId }}},
          {new: true, runValidators: true }
          );

          return updatedJob;
        }

        throw new AuthenticationError('You must be logged in to delete a Contact!');

      },
      updateContact: async(parent, { _id, ...updateArgs }, context) => {

        //allow user to updated a current contact if logged in
        if(context.user) {
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
          });

          return updatedContact[0];
        }

        throw new AuthenticationError('You must be logged in to update a Contact!');
      }
    }
  };

module.exports = resolvers