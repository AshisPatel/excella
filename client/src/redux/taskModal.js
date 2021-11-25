// action calls

// action call to open a blank modal for new task
export const newTaskModal = () => {
    return {
        type: 'OPEN_NEW_MODAL'
    };
};
// action call to open a modal to update an existing task
export const updateTaskModal = (task) => {
    return {
        type: 'OPEN_UPDATE_MODAL',
        payload: task 
    };
};
// action call to close modal
export const closeTaskModal = () => {
    return {
        type: 'CLOSE_TASK_MODAL'
    };
};

const initialState = {
    showTaskModal: false,
    update: false,
    task: {}
};

export default function taskModalReducer(taskModal = initialState, { type, payload }) {
    switch(type) {
        case 'OPEN_NEW_MODAL':
            return {
                task: {},
                update: false,
                showTaskModal:true
            };
        case 'OPEN_UPDATE_MODAL':
            return {
                showTaskModal:true,
                update: true, 
                task: payload
            };
        case 'CLOSE_TASK_MODAL':
            return {
                showTaskModal:false,
                update: false, 
                task: {}
            }
        default: 
            return taskModal; 
    }
};