import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideNav = () => {
    return (
        <div className='side-nav'>
            <button className='side-nav-btn' id="em-btn">
                <FontAwesomeIcon icon="tasks" />
                <span className="label">
                    Eisenhower Matrix
                </span>
            </button>

            <button className='side-nav-btn' id="jc-btn">
                <FontAwesomeIcon icon="users" />
                <span className="label">
                    Job CRM
                </span>
            </button>

            <button className='side-nav-btn' id="pt-btn">
                <FontAwesomeIcon icon="clock" />
                <span className="label">
                    Pomodoro Timer
                </span>
            </button>
            
            <button className='side-nav-btn' id="help-btn">
                <FontAwesomeIcon icon="question-circle" />
                <span className="label">
                    Help
                </span>
            </button>
        </div>
    );
};

export default SideNav;