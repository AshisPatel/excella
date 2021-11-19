import { createStore, combineReducers } from "redux";
// import reducers to include in root reducer
import currentPageReducer from "./currentPage";
const rootReducer = combineReducers({
    currentPage: currentPageReducer
});


const store = createStore(rootReducer);
// console log message on every state update
store.subscribe(() => {
    console.log(store.getState());
});
export default store; 
