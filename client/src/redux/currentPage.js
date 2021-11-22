// action calls go here, they create our 'action' object that will be dispatched to our reducer function

// the action includes the 'type' which is the string that is used to identify the case in our reducer's switch statement

// there can also be a payload which is data that is passed in to the action call function that is needed to update the state 

export const setCurrentPage = (page) => {
    return {
        type: "SET_CURRENT_PAGE",
        payload: page
    };
};

// takes in slice of state and it's initial value
// initiated as an empty string
// also takes in the action parameter destructed into { type, payload }
export default function currentPageReducer(currentPage = window.location.pathname, { type, payload }) {
    switch(type) {
        case "SET_CURRENT_PAGE":
            // payload will contain the name of the current page, this will set thecurrent page equal to what is returned here 
            return payload; 
        default: 
            return currentPage; 
    }
};