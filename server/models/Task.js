const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//creates the taskSchema which we'll import into our User schema
const taskSchema = new Schema({
    //task content will be for the user to declare their intent/task
    taskContent: {
        type: String,
        required: true
    }, 
    //this will be the category in the eisenhower matrix which the user places taskContent to let them know where that task stands 
    category: {
        type: String,
        required: true,
        enum: ['do', 'delegate', 'doLater', 'delete']
    },
    //boolean value to show if task is completed or not for deletion
    complete: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
});

const Task = model('Task', taskSchema);

module.exports = Task;
