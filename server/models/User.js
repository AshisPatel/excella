const mongoose = require('mongoose');

//import our schemas that will become part of the userSchema
const jobSchema = require('./Job');
const taskSchema = require('./Task');
const { Schema } = mongoose;

const userSchema = new Schema({

})

const User = mongoose.model('User', userSchema);

module.exports = User;