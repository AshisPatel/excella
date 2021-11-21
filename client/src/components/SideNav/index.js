import React, { useEffect, useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/currentPage';
import { Link } from "react-router-dom";
import useWindowDimensions from '../../hooks/useWindowDimensions';

const SideNav = () => {

    const { height, width } = useWindowDimensions();
    const [display, setDisplay] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [clickOff, setClickOff] = useState(false); 
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);
    const transitionWidth = 1000;

    const handleClick = (e) => {
        console.log(e.target.parentNode);
        let name = e.target.name;
        if (!name) {
            name = e.target.parentNode.getAttribute('name');
        }

        console.log(name);
        dispatch(setCurrentPage(name));
    }

    const toggleDropDown = async () => {
    //   setDisplay(prevDisplay => !prevDisplay);

        if(display) {
            setFadeOut(true);
            setClickOff(true);
            setTimeout(() => {
                setDisplay(false) 
                setClickOff(false);
            }, 400);
            
        } else {
            setFadeOut(false);
            setDisplay(true);
        }
    };

    useEffect(() => {
        width > transitionWidth ? setDisplay(true) : setDisplay(false);
    }, [width]);

    return (
        <>
            {width < transitionWidth &&
                <button
                    className={`options side-nav-btn ${display && 'op-selected'}`}
                    onClick={() => toggleDropDown()}
                >
                    <FontAwesomeIcon icon="cog" />
                    <span className="label">
                        Options
                    </span>
                </button>
            }
            {display ?
                <div className={`side-nav ${clickOff && 'click-off'}`}>
                    <Link to="/EisenhowerMatrix">
                        <button
                            className={`side-nav-btn em-btn ${currentPage === 'Eisenhower Matrix' && 'sn-selected'} ${width < transitionWidth ? !fadeOut ? 'option-item-in-0' : 'option-item-out-0' : 'option-item-in-0'}`}
                            name='Eisenhower Matrix'
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon icon="tasks" name='Eisenhower Matrix' />
                            <span className="label">
                                Eisenhower Matrix
                            </span>
                        </button>
                    </Link>

                    <Link to="/JobCRM">
                        <button
                            className={`side-nav-btn jc-btn ${currentPage === 'Job CRM' && 'sn-selected'} ${width < transitionWidth ? !fadeOut ? 'option-item-in-1' : 'option-item-out-1' : 'option-item-in-1'}`}
                            name="Job CRM"
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon icon="users" name="Job CRM" />
                            <span className="label">
                                Job CRM
                            </span>
                        </button>
                    </Link>

                    <Link to="/PomodoroTimer">
                        <button
                            className={`side-nav-btn pt-btn ${currentPage === 'Pomodoro Timer' && 'sn-selected'} ${width < transitionWidth ? !fadeOut ? 'option-item-in-2' : 'option-item-out-2' : 'option-item-in-2'}`}
                            name='Pomodoro Timer'
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon icon="clock" name='Pomodoro Timer' />
                            <span className="label">
                                Pomodoro Timer
                            </span>
                        </button>
                    </Link>

                    <Link to="/">
                        <button
                            className={`side-nav-btn help-btn ${currentPage === 'Help' && 'sn-selected'} ${width < transitionWidth ? !fadeOut ? 'option-item-in-3' : 'option-item-out-3' : 'option-item-in-3'}`}
                            name="Help"
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon icon="question-circle" name="Help" />
                            <span className="label">
                                Help
                            </span>
                        </button>
                    </Link>
                </div>
            :
            <></>}

        </>
    );
};

export default SideNav;