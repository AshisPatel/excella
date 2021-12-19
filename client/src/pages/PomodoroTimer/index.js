import React, { useState, useEffect } from "react";
import './style.css';
import Auth from "../../utils/Auth";
import NavError from '../../components/NavError';
import ExcellaShadowIcon from "../../components/ExcellaShadowIcon";
import TimerOptions from "../../components/TimerOptions";
import Loader from "../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, decreaseTime, switchTimers, setWorkTime, setBreakTime, setTime } from '../../redux/pomodoroTimer';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

const PomodoroTimer = ({ setShowTimerOptions }) => {
    // import globalState for pomodoroTimer and dispatch to modify global store
    const pomodoroTimer = useSelector(state => state.pomodoroTimer);
    const dispatch = useDispatch();

    const { time, workTime, breakTime, working, timerRunning, timerInterval } = pomodoroTimer;

    const { loading, data } = useQuery(QUERY_ME);

    // once data has been loaded, make a call to set the workTime and breakTime based on the user's settings
    useEffect(() => {
        if(!loading) {
            dispatch(setWorkTime(data.me.workTime));
            dispatch(setBreakTime(data.me.breakTime));
            // time variable must be updated as well, based on whether we're starting on work time or break time 
            working ? dispatch(setTime(data.me.workTime)) : dispatch(setTime(data.me.breakTime)); 
        }    
    }, [loading])


    // function to start timer
    const startTimerHandler = () => {
        // we need to dispatch to start the timer -> this will create the timeInterval 
        dispatch(startTimer(setInterval(() => {
            dispatch(decreaseTime());
        }, 1000)));

    }

    const stopTimerHandler = () => {
        // stop timer and clear interval
        clearInterval(timerInterval);
        dispatch(stopTimer());
    }
    // function to format time from milliseconds to 'mm:ss'
    const formatTime = (time) => {
        let minutes = Math.floor(time / (60 * 1000));
        let seconds = (time - minutes * 60 * 1000) / 1000;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }


        return (<><span>{minutes}</span><span>:</span><span>{seconds}</span></>)
    }

    // check to see when time is equal to 0 and dispatch actions to reset timer and toggle mode
    useEffect(() => {

        if (time === 0) {
            stopTimerHandler();
            dispatch(switchTimers());
        }
    }, [time])

    // do not load for not logged in users
    if (!Auth.loggedIn()) {
        return (
            <NavError message={'You need to be logged in to view this page!'} />
        )
    }

    return (
        <div className="container">
            <div className="title-wrapper">
                <h1 className='page-title'>Pomodoro Timer</h1>
            </div>
            {loading ?
                <Loader />
                :
                <>
                    <div className="excella-speech-label timer-message">
                        <ExcellaShadowIcon />
                        <h2>
                            {working ? "You've got this, I believe in you!" : "Great job! Let's relax."}
                        </h2>
                    </div>
                    <div className="timer">
                        <div className="time-display-container">
                            <span className="time-display">
                                {formatTime(time)}
                            </span>
                        </div>
                        <div className="timer-btn-container">
                            <button
                                className="timer-btn"
                                onClick={() => timerRunning ? stopTimerHandler() : startTimerHandler()}
                            >
                                {/* if timerRunning is true set button to stop, if it is not running and the time is maximum set it to start, if the timerRunning and time is not maximum set to resume */}
                                {/* time needs to be converted to minutes */}
                                {timerRunning ? 'Pause' : (time / 1000 / 60) < (working ? workTime : breakTime) ? 'Resume' : 'Start'}
                                <FontAwesomeIcon icon={timerRunning ? 'pause' : 'play'} />
                            </button>
                            <button
                                className="timer-btn"
                                onClick={() => setShowTimerOptions(true)}
                            >
                                Options
                                <FontAwesomeIcon icon='cog' />
                            </button>
                        </div>
                    </div>
                </>
            }

        </div>
    );
};

export default PomodoroTimer;