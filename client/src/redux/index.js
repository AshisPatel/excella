import { createStore, combineReducers } from "redux";
// import reducers to include in root reducer
import currentPageReducer from "./currentPage";
// remove once authentication is added
import loggedInReducer from "./loggedIn";

const rootReducer = combineReducers({
    currentPage: currentPageReducer,
    // remove the loggedIn slice when server and auth are implemented
    loggedIn: loggedInReducer
});


const store = createStore(rootReducer);
// console log message on every state update
store.subscribe(() => {
    console.log(store.getState());
});
export default store; 
