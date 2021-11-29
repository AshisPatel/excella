const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const contactSchema = new Schema({
//add 'follow-up' array of user contact notes each time they reach out to one of their contacts (feature later? or MVP capability?)
    // contactId: {
    //     //_id for each contact
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId()
    // },
    firstName: {
        type: String,
        require: "Please enter your contact's first name",
        trim: true
    },
    lastName: {
        type: String,
        require: "Please enter your contact's  last name",
        trim: true
    },
    email: {
        type: String,
        require: "Please enter your contact's email",
        trim: true
    },
    phone: {
        type: String,
        require: "Please enter your contact's phone",
        trim: true
    }
});

const jobSchema = new Schema({
//jobs schema
    jobTitle: {
        type: String,
        required: 'Please enter the Job Title!',
        trim: true
    },
    employer: {
        type: String,
        required: 'Please enter the job employer name',
        trim: true
    },
    lastUpdated: {
        type: Date,
        required: 'Please enter a the updated Date',
        trim: true,
        default: Date.now
        //get: appDate => dateFormat(appDate)
    },
    applicationStatus: {
        type: String,
        required: 'Please enter a job application status',
        // enum: ['submitted', 'interview', 'closed-no offer', 'offer']
    },
    username: {
        type: String,
        required: 'Please enter your username!'
    },
    contacts: [contactSchema]
},
// {
//     toJSON: {
//             getters: true
//     }
// }
);

const Job = model('Job', jobSchema);

module.exports = Job;