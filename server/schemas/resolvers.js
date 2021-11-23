const { User } = require('../models');


const resolvers = {
    Query: {
      users: async () => {
          return User.find()
      },
      test: async () => {
        return 'This is a test'
      }
    }
  };
  

module.exports = resolvers