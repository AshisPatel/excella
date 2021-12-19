// actions calls

export const setTime = (time) => {
    return {
        type: 'SET_TIME',
        payload: time
    }
}

// action call to set work time, will take time in minutes
export const setWorkTime = (time) => {
    return {
        type: 'SET_WORK_TIME',
        payload: time
    };
};

// action call to set break time, will take time in minutes
export const setBreakTime = (time) => {
    return {
        type: 'SET_BREAK_TIME',
        payload: time
    };
};

// action call to decrease the time 1 second
export const decreaseTime = () => {
    return {
        type: 'DECREASE_TIME'
    };
};

// action call to start timer
export const startTimer = (intervalId) => {
    return {
        type: 'START_TIMER',
        payload: intervalId
    };
};

// action call to stop timer
export const stopTimer = () => {
    return {
        type: 'STOP_TIMER'
    };
};

// action call to switch timers
export const switchTimers = () => {
    return {
        type: 'SWITCH_TIMERS'
    }
}

// initialize state
let initialState = {
    workTime: 25,
    breakTime: 5,
    timerInterval: '',
    working: true,
    timerRunning: false
};

// must be declared after initialization as the initial variables cannot be referenced until the object is created 
let initialStateWithTime = {...initialState, time: (initialState.working ? initialState.workTime : initialState.breakTime) * 60 * 1000}

// setup reducer 
export default function pomodoroTimerReducer(pomodoroTimer = initialStateWithTime, { type, payload }) {
    switch (type) {
        case 'SET_TIME':
            return {
                ...pomodoroTimer,
                time: payload * 60 * 1000
            }
        case 'SET_WORK_TIME':
            return {
                ...pomodoroTimer,
                workTime: payload
            };
        case 'SET_BREAK_TIME':
            return {
                ...pomodoroTimer,
                breakTime: payload
            };
        case 'DECREASE_TIME': 
            return {
                ...pomodoroTimer,
                time: pomodoroTimer.time - 1000
            };
        case 'START_TIMER': {
            return {
                ...pomodoroTimer,
                timerRunning: true,
                timerInterval: payload
            }
        }
        case 'STOP_TIMER': {
            return {
                ...pomodoroTimer,
                timerRunning: false,
                timerInterval: ''
            };
        }
        case 'SWITCH_TIMERS': 
        // switch working status and switch the time to be the breaktime if the status USED to be working and switch time to the worktime if the status USED to be NOT working
        return {
            ...pomodoroTimer,
            working: !pomodoroTimer.working,
            time: (pomodoroTimer.working ? pomodoroTimer.breakTime : pomodoroTimer.workTime) * 60 * 1000
        }
        default:
            return pomodoroTimer;
    }
};