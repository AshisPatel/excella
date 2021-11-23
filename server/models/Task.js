const mongoose = require('mongoose');

const { Schema } = mongoose;

//creates the taskSchema which we'll import into our User schema
const taskSchema = new Schema({
    taskContent: {
        type: String,
        required: true
    }, 
    Category: {
        type: String,
        required: true
    },
    Complete: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = taskSchema;