const mongoose = require('mongoose');

//import our schemas that will become part of the userSchema
const jobSchema = require('./Job');
const taskSchema = require('./Task');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        trim: true
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
    jobs: [jobSchema],
    tasks: [taskSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;