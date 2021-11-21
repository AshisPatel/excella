import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"
import store from "./redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faLock, faWindowClose, faCheck, faTasks, faQuestionCircle, faClock, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faEnvelope, faLock, faWindowClose, faCheck, faTasks, faQuestionCircle, faClock, faUsers, faCog );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
