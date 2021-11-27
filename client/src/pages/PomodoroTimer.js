import React from "react";
import Auth from "../utils/Auth";
import NavError from '../components/NavError';

const PomodoroTimer = () => {
    if(!Auth.loggedIn()) {
        return (
            <NavError message={'You need to be logged in to view this page!'}/>
        )
    }

    return (
        <div>
            There's going to be a Pomodoro Timer here!
        </div>
    );
};

export default PomodoroTimer; 