const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

    workTime: {
        type: Number,
        default: 25,
        max: 60,
        min: 1
    },

    breakTime: {
        type: Number,
        default: 5,
        max: 60,
        min: 1
    }
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