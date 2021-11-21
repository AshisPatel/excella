import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/currentPage';
import { Link } from "react-router-dom";

const SideNav = () => {

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);

    const handleClick = (e) => {

        let name = e.target.name;
        if (!name) {
            name = e.target.parentNode.getAttribute('name');
        }

        console.log(name);
        dispatch(setCurrentPage(name));
    }

    return (
        <div className='side-nav'>
            <Link to="/EisenhowerMatrix">
                <button
                    className={`side-nav-btn em-btn ${currentPage === 'Eisenhower Matrix' && 'em-selected'}`}
                    name='Eisenhower Matrix'
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon="tasks" />
                    <span className="label">
                        Eisenhower Matrix
                    </span>
                </button>
            </Link>

            <Link to="/JobCRM">
                <button
                    className={`side-nav-btn jc-btn ${currentPage === 'Job CRM' && 'jc-selected'}`}
                    name="Job CRM"
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon="users" />
                    <span className="label">
                        Job CRM
                    </span>
                </button>
            </Link>

            <Link to="/PomodoroTimer">
                <button
                    className={`side-nav-btn pt-btn ${currentPage === 'Pomodoro Timer' && 'pt-selected'}`}
                    name='Pomodoro Timer'
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon="clock" />
                    <span className="label">
                        Pomodoro Timer
                    </span>
                </button>
            </Link>

            <Link to="/">
                <button
                    className={`side-nav-btn help-btn ${currentPage === 'Help' && 'help-selected'}`}
                    name="Help"
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon="question-circle" />
                    <span className="label">
                        Help
                    </span>
                </button>
            </Link>
        </div>
    );
};

export default SideNav;