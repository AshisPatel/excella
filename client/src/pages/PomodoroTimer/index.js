import React, { useState, useEffect } from "react";
import './style.css';
import Auth from "../../utils/Auth";
import NavError from '../../components/NavError';
import dayjs from "dayjs";

const PomodoroTimer = () => {
    // instantiate timer variables
    const [restTime, setRestTime] = useState(0.5 * 60 * 1000);
    const [workTime, setWorkTime] = useState(0.5 * 60 * 1000);
    const [time, setTime] = useState(workTime);
    const [rest, setRest] = useState(false);
    const [timerId, setTimerId] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);


    // function to start timer
    const startTimer = () => {
        // if its a rest time, decrement the restTime 
        setTimerId(setInterval(() => {
            setTime(prevTime => prevTime - 1000)
        }, 1000));
        setTimerRunning(true);
    }
    // function to stop timer
    const stopTimer = () => {
        clearInterval(timerId);
        setTimerRunning(false);
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

    // monitor when work timer or rest timer hits 0 and switch to the other 
    useEffect(async () => {
        if (time === 0) {
            clearInterval(timerId);
            // set time limit based on mode that just ended
            rest ? setTime(workTime) : setTime(restTime);
            // toggle rest mode on or off
            rest ? setRest(false) : setRest(true);
            setTimerRunning(false);
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
            <div className="timer">
                {formatTime(time)}
                <button
                    onClick={() => timerRunning ? stopTimer() : startTimer()}
                >
                    {/* if timerRunning is true set button to stop, if it is not running and the time is maximum set it to start, if the timerRunning and time is not maximum set to resume */}
                    {timerRunning ? 'Stop' : time < (rest ? restTime : workTime) ? 'Resume' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;