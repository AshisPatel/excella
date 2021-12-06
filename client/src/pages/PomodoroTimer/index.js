import React, { useState, useEffect } from "react";
import './style.css';
import Auth from "../../utils/Auth";
import NavError from '../../components/NavError';
import ExcellaShadowIcon from "../../components/ExcellaShadowIcon";
import TimerOptions from "../../components/TimerOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, decreaseTime } from '../../redux/pomodoroTimer';

const PomodoroTimer = () => {
    // import globalState for pomodoroTimer and dispatch to modify global store
    const pomodoroTimer = useSelector(state => state.pomodoroTimer);
    const dispatch = useDispatch(); 

    const { time, workTime, breakTime, working, timerRunning, timerInterval } = pomodoroTimer; 

    // function to start timer
    const startTimerHandler = () => {
        // we need to dispatch to start the timer -> this will create the timeInterval 
        dispatch(startTimer(setInterval(() => {
            dispatch(decreaseTime());
        },1000))); 
        
    }


    const stopTimerHandler = () => {
        // stop timer and clear interval
        clearInterval(timerInterval);
        dispatch(stopTimer()); 
    }
    // function to format time from milliseconds to 'mm:ss'
    const formatTime = (time) => {
        const minutes = Math.floor(time / (60 * 1000));
        const seconds = (time - minutes * 60 * 1000) / 1000;
        if (minutes < 10) {
            if (seconds < 10) {
                return `0${minutes}:0${seconds}`;
            } else {
                return `0${minutes}:${seconds}`;
            }
        }
        if (seconds < 10) {
            return `${minutes}:0${seconds}`
        }
        return `${minutes}:${seconds}`;
    }   

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
            <div className="excella-speech-label timer-message">
                <ExcellaShadowIcon />
                <h2>
                    {working ? "You've got this, I believe in you!" :  "Great job! Let's relax."}
                </h2>
            </div>
            <div className="timer">
                <span className="time-display">{formatTime(time)}</span>
                <div className="timer-btn-container">
                    <button
                        className="timer-btn"
                        onClick={() => timerRunning ? stopTimerHandler() : startTimerHandler()}
                    >
                        {/* if timerRunning is true set button to stop, if it is not running and the time is maximum set it to start, if the timerRunning and time is not maximum set to resume */}
                        {/* time needs to be converted to minutes */}
                        {timerRunning ? 'Pause' : (time/1000/60) < (working ? workTime : breakTime) ? 'Resume' : 'Start'}
                        <FontAwesomeIcon icon={timerRunning ? 'pause' : 'play'} />
                    </button>
                    <button 
                        className="timer-btn"
                        
                    >
                        Options
                        <FontAwesomeIcon icon='cog' />
                    </button>
                </div>
            </div>
            <TimerOptions />
        </div>
    );
};

export default PomodoroTimer;