// eisenhowerMatrix will be the redux store slice that contains all the information for the eisenhowerMatrix page. 
// this page will contain all the information about tasks 
// thus our initialState contains tasks

// action calls below

// adding a task
// task should contain all the info required content, category, _id, username, and completed 

// might need an add multiple tasks for when the user signs on
export const addTask = (task) => {
    return {
        type: 'ADD_TASK',
        payload: task
    };
};

// will take in an array of task objects
export const addMultipleTasks = (tasks) => {
    return {
        type: 'ADD_MULTIPLE_TASKS',
        payload: tasks
    };
};

// delete a task
// id will contain the task _id
export const deleteTask = (_id) => {
    return {
        type: 'DELETE_TASK',
        payload: _id
    };
};

// delete all tasks
export const deleteAllTasks = () => {
    return {
        type: 'DELETE_ALL_TASKS'
    };
};

// delete all tasks in selected category
// category will include the category name
export const deleteCategoryTasks = (category) => {
    return {
        type: 'DELETE_CATEGORY_TASKS',
        payload: category
    };
};

// delete all completed tasks
export const deleteCompletedTasks = () => {
    return {
        type: 'DELETE_COMPLETED_TASKS'
    };
};

// update a task
// task will contain all information about the task like in add task
export const updateTask = (task) => {
    return {
        type: 'UPDATE_TASK',
        payload: task
    };
};

const initialState = {
    tasks: []
};

// task item skeletion :
// task: {
//     content,
//     category,
//     completed,
//     username,
//     _id
// }


export default function eisenhowerMatrixReducer(eisenhowerMatrix = initialState, { type, payload }) {
    switch (type) {
        case 'ADD_TASK':
            return {
                tasks: [...eisenhowerMatrix.tasks, payload]
            };

        case 'ADD_MULTIPLE_TASKS':
            return {
                tasks: [...eisenhowerMatrix.tasks, ...payload]
            };

        case 'DELETE_TASK':
            // returns all items that do not match the _id of the task we want to delete 
            {
                const newTasks = eisenhowerMatrix.tasks.filter(task => task._id !== payload);
                return {
                    tasks: [...newTasks]
                };
            }
        case 'DELETE_ALL_TASKS':
            return {
                tasks: []
            }
        case 'DELETE_CATEGORY_TASKS':
            {  // returns all items that do not match the category name
                const newTasks = eisenhowerMatrix.tasks.filter(task => task.category !== payload);
                return {
                    tasks: [...newTasks]
                };
            }
        case 'DELETE_COMPLETED_TASKS':
            {
                const newTasks = eisenhowerMatrix.tasks.filter(task => !task.completed);
                return {
                    tasks: [...newTasks]
                }
            }
        case 'UPDATE_TASK':
            // sets task we want to update to the data coming in the payload
          {  
            const newTasks = eisenhowerMatrix.tasks.map(task => task._id === payload._id ? task = payload : task);
            return {
                tasks: [...newTasks]
            };
        }
        default:
            return eisenhowerMatrix;
    }
}