const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const timerSchema = require('./Timer'); 
//import our schemas that will become part of the userSchema
//const { jobSchema } = require('./Job');
//const taskSchema = require('./Task');
const { Schema } = mongoose;

const userSchema = new Schema({
    //username to identify user
    username: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        required: true, 
        minLength: 5
    }, 
    //references jobSchema which holds user's job data (employer, status, etc.)
    jobs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],

    //references taskSchema which holds user's task data (eisenhower array, completed, createdAt, etc.)
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],

    timer: [timerSchema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  

const User = mongoose.model('User', userSchema);

module.exports = User;