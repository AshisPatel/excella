// The jobCRM redux slice will manage storing all the user information regarding jobs -> including their contacts
// Other actions will be to add jobs, update jobs, add contacts, and update contacts 

// action calls
// job information will be structured like below

// job = {
//     _id: ID,
//     jobTitle: string,
//     employer: string,
//     applicationStatus: string, 
//     lastUpdated: date
//     contacts: [
//         {
//             _id: ID
//             firstName: string,
//             lastName: string,
//             number: string,
//             email: string
//         }

//     ]
// }

// might need an add multiple jobs to execute on user sign-on
export const addJob = (job) => {
    return {
        type: 'ADD_JOB',
        payload: job
    };
};

export const updateJob = (job) => {
    return {
        type: 'UPDATE_JOB',
        payload: job
    };
};

export const deleteJob = (_id) => {
    return {
        type: 'DELETE_JOB',
        payload: _id
    };
};

// for the addContact, updateContact action calls we will need to take in the jobID and the contact info, which means our payload will be structured as an object
export const addContact = (job_id, contact) => {
    return {
        type: 'ADD_CONTACT',
        payload: { job_id, contact }
    };
};

export const updateContact = (job_id, contact) => {
    return {
        type: 'UPDATE_CONTACT',
        payload: { job_id, contact }
    };
};

export const deleteContact = (job_id, _id) => {
    return {
        type: 'DELETE_CONTACT',
        payload: {job_id, _id}
    };
};

const initialState = {
    jobs: []
};

export default function jobCRMReducer(jobCRM = initialState, { type, payload }) {
    switch (type) {
        case 'ADD_JOB':
            return {
                jobs: [...jobCRM.jobs, payload]
            };
        case 'UPDATE_JOB': {
            const newJobs = jobCRM.jobs.map(job => {
                if (job._id === payload._id) {
                    return payload;
                } else {
                    return job
                }
            });

            return {
                jobs: [...newJobs]
            };
        }
        case 'DELETE_JOB': {
            const newJobs = jobCRM.jobs.filter(job => job._id !== payload);
            return {
                jobs: [...newJobs]
            };
        }
        case 'ADD_CONTACT': {
            // payload is an object that contains job_id and contact
            const newJobs = jobCRM.jobs.map(job => {
                if (job._id.toString() === payload.job_id) {
                    job.contacts.push(payload.contact);
                }
                return job;
            });
            console.log(newJobs);
            return {
                jobs: [...newJobs]
            };
        }
        case 'UPDATE_CONTACT': {
            // payload is an object that contains job_id and contact 
            const newJobs = jobCRM.jobs.map(job => {
                if(job._id.toString() === payload.job_id) {
                    const newContacts = job.contacts.map(contact => {
                        if (contact._id === payload.contact._id) {
                            contact = payload.contact;
                        } 
                        return contact; 
                    });
                    job = {
                        ...job,
                        contacts: [...newContacts]
                    };
                }
                return job; 
            });
            return {
                jobs: [...newJobs]
            };
        }
        case 'DELETE_CONTACT': {
            // payload is an object that contains job_id and _id(for the contact)
            const newJobs = jobCRM.jobs.map(job => {
                if(job._id.toString() === payload.job_id) {
                    const newContacts = job.contacts.filter(contact => contact._id !== payload._id);
                    job = {
                        ...job,
                        contacts: [...newContacts]
                    };
                }
            });
            return {
                jobs: [...newJobs]
            };
        }
        default: 
            return jobCRM;
    }
}

