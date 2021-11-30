
// setting filters, takes in an object that contains the employer filter and job title filter
export const setJobFilters = (jobTitleFilter, employerFilter) => {
    return {
        type: 'SET_JOB_SEARCH_FILTERS',
        payload: {jobTitleFilter, employerFilter}
    }
}

// clear job search filters
export const clearJobFilters = () => {
    return {
        type: 'CLEAR_JOB_SEARCH_FILTERS'
    }
}

const initialState = {
    employerFilter: '',
    jobTitleFilter: ''
};

export default function jobCRMReducer(jobCRM = initialState, { type, payload }) {
    switch (type) {
        case 'SET_JOB_SEARCH_FILTERS': {
            return {
                jobTitleFilter: payload.jobTitleFilter ? payload.jobTitleFilter : '',
                employerFilter: payload.employerFilter ? payload.employerFilter : ''
            };
        }

        case 'CLEAR_JOB_SEARCH_FILTERS': {
            return {
                jobTitleFilter: '',
                employerFilter: ''
            }
        }

        default:
            return jobCRM;
    }
}

