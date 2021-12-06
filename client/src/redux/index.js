import { createStore, combineReducers } from "redux";
// import reducers to include in root reducer
import currentPageReducer from "./currentPage";
import taskModalReducer from "./taskModal";
import jobModalReducer from "./jobModal";
import jobCRMReducer from "./jobCRM";
import contactModalReducer from "./contactModal";
import pomodoroTimerReducer from "./pomodoroTimer";


const rootReducer = combineReducers({
    currentPage: currentPageReducer,
    taskModal: taskModalReducer,
    jobModal: jobModalReducer,
    contactModal: contactModalReducer,
    jobCRM: jobCRMReducer,
    pomodoroTimer: pomodoroTimerReducer
});


const store = createStore(rootReducer);
// console log message on every state update
store.subscribe(() => {
    console.log(store.getState());
});
export default store; 
