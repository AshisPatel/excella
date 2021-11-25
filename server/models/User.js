const mongoose = require('mongoose');

//import our schemas that will become part of the userSchema
const jobSchema = require('./Job');
const taskSchema = require('./Task');
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
        unique: true
    },
    password: {
        type: String,
        required: true, 
        minLength: 5
    }, 
    //references jobSchema which holds user's job data (employer, status, etc.)
    jobs: [jobSchema],
    //references taskSchema which holds user's task data (eisenhower array, completed, createdAt, etc.)
    tasks: [taskSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;