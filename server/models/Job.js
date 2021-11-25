const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const { Schema } = mongoose;

const contactSchema = new Schema({
//name => required
//email => required, validate
//phone => required, validate
//add 'follow-up' array of user contact notes each time they reach out to one of their contacts (feature later? or MVP capability?)
});

const jobSchema = new Schema({
//jobs schema
    jobTitle: {
        type: String,
        required: 'Please enter the Job Title!',
        trim: true
    },
    applicationDate: {
        type: Date,
        default: Date.now,
        get: appDate => dateFormat(appDate)
    },
    applicationStatus: {
        type: String,
        required: 'Please enter a job application status',
        enum: ['submitted', 'interview', 'closed-no offer', 'offer']
    },
    username: {
        type: String,
        required: 'Please enter your username!'
    },
    //or could we do this...
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    contacts: [contactSchema]
},
    {
        toJSON: {
            getters: true
        }
    }
);

//would adding a virtual here for 'contacts' benefit us in any way
    //i.e. # of contacts
    //contact names...etc,etc.

const Job = model('Job', jobSchema);

module.exports = jobSchema;