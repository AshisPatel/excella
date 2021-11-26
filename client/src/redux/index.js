import { createStore, combineReducers } from "redux";
// import reducers to include in root reducer
import currentPageReducer from "./currentPage";
import eisenhowerMatrixReducer from "./eisenhowerMatrix";
import taskModalReducer from "./taskModal";
import jobModalReducer from "./jobModal";
import jobCRMReducer from "./jobCRM";
// remove once authentication is added
import loggedInReducer from "./loggedIn";


const rootReducer = combineReducers({
    currentPage: currentPageReducer,
    // remove the loggedIn slice when server and auth are implemented
    loggedIn: loggedInReducer,
    eisenhowerMatrix: eisenhowerMatrixReducer,
    taskModal: taskModalReducer,
    jobModal: jobModalReducer,
    jobCRM: jobCRMReducer
});


const store = createStore(rootReducer);
// console log message on every state update
store.subscribe(() => {
    console.log(store.getState());
});
export default store; 
