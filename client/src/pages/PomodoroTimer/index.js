import React, {useState, useEffect} from "react";
import './style.css'; 
import Auth from "../../utils/Auth";
import NavError from '../../components/NavError';
import dayjs from "dayjs";

const PomodoroTimer = () => {
    // instantiate timer variables
    const [time, setTime] = useState(25*60*1000); 
    const [timerId, setTimerId] = useState(0); 
    const [timerRunning, setTimerRunning] = useState(false);  
    if(!Auth.loggedIn()) {
        return (
            <NavError message={'You need to be logged in to view this page!'}/>
        )
    }

    const startTimer = () => {
        setTimerId(setInterval(()=> {setTime(prevTime => prevTime - 1000)}, 1000)); 
        setTimerRunning(true); 
    }

    const stopTimer = () => {
       clearInterval(timerId); 
       setTimerRunning(false); 
    }

    return (
        <div className="timer">
            { time }
            <button
                onClick={() => startTimer()}
                disabled={timerRunning}
            >
                Start
            </button>

            <button
                onClick={() => stopTimer()}
                disabled={!timerRunning}
            >
                Stop 
            </button>
        </div>
    );
};

export default PomodoroTimer; 