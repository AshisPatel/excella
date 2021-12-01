// action calls

// action call to open a blank modal for new job
export const newJobModal = () => {
    return {
        type: 'OPEN_NEW_JOB_MODAL'
    };
};
// action call to open a modal to update an existing job
export const updateJobModal = (job) => {
    return {
        type: 'OPEN_UPDATE_JOB_MODAL',
        payload: job 
    };
};
// action call to close modal
export const closeJobModal = () => {
    return {
        type: 'CLOSE_JOB_MODAL'
    };
};

const initialState = {
    showJobModal: false,
    update: false,
    job: {}
};

export default function jobModalReducer(jobModal = initialState, { type, payload }) {
    switch(type) {
        case 'OPEN_NEW_JOB_MODAL':
            return {
                job: {},
                update: false,
                showJobModal:true
            };
        case 'OPEN_UPDATE_JOB_MODAL':
            return {
                showJobModal:true,
                update: true, 
                job: payload
            };
        case 'CLOSE_JOB_MODAL':
            return {
                showJobModal:false,
                update: false, 
                job: {}
            }
        default: 
            return jobModal; 
    }
};