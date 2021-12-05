import React, { useState, useEffect } from 'react';
import ExcellaIcon from '../ExcellaIcon';

const TimerOptions = () => {

    // initialize formState
    const [formState, setFormState] = useState({
        workTime: 25,
        restTime: 5
    });

    return (
        <form>
            <label
                for='workTime'
            >
                Work Cycle Time (minutes):
            </label>
            <input
                aria-label='work time'
                name='workTime'
                type='number'
                placeholder = 'minutes'
                value={formState.workTime}
            />
            <label
                for='restTime'
            >
                Rest Cycle Time (minutes):
            </label>
            <input
                aria-label= 'rest time'
                name='restTime'
                type='number'
                placeholder = 'minutes'
                value={formState.restTime}
            />

        </form>
    )
}

export default TimerOptions;

