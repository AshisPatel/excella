import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import ExcellaIcon from '../ExcellaIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { UPDATE_TIMER } from '../../utils/mutations';
import { useSelector, useDispatch } from 'react-redux'; 

const TimerOptions = ({ setShowTimerOptions }) => {
    // get workTime and breakTime from global state 
    const { workTime, breakTime } = useSelector(state => state.pomodoroTimer);

    // import updateTimer mutation
    const [updateTimer, { error }] = useMutation(UPDATE_TIMER); 

    // initialize formState
    const [formState, setFormState] = useState({
        workTime,
        breakTime
    });

    // initialize warning variable for form submission 
    const [warning, setWarning] = useState('');

    // initialize state variables for animations
    const [fadeOut, setFadeOut] = useState(false);
    const [success, setSuccess] = useState(false);

    // useRef will target workTime input on modal open
    const numberRef = useRef();
    useEffect(() => {
        numberRef.current.focus();
    }, [])

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formState.breakTime || !formState.workTime) return setWarning('Duration of cycles must be between 1 and 60 minutes.');
        if(formState.breakTime > formState.workTime) return setWarning('Break duration cannot be longer than Work duration.'); 
        // make mutation to update user timer variables 


        
    }

    // handle form input change
    const handleChange = (e) => {
        let { name, value } = e.target;
        // check if input for breakTime would be longer than work time 
        if (name === 'breakTime') {
            if (value > formState.workTime) return setWarning('Break duration cannot be greater than work duration');
        }

        // make sure values are between 0 and 60 minutes
        // must be greater than 0 to allow a blank input ---> will verify inputs are not 0 or blank on submit 
        if (value > 60 || value < 0) {
            return setWarning(`${name === 'workTime' ? "Work" : "Break"} duration must be between 1 to 60 minutes`)
        }
        setWarning(''); 
        setFormState(prevState => ({ ...prevState, [name]: value })); 
    }

    // handle time increase for work time plus button
    const incrementWorkTime = () => {
        if (parseInt(formState.workTime) < 60) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, workTime: parseInt(prevState.workTime) + 1 }));
        } else if (!formState.workTime) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, workTime: 1 }));
        }
        setWarning('Work duration must be less than 60 minutes.');
    }

    // handle time decrease for work time minus button
    const decrementWorkTime = () => {
        if (parseInt(formState.workTime) > 1) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, workTime: parseInt(prevState.workTime) - 1 }));
        } else if (!formState.workTime) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, workTime: 1 }));
        }
        setWarning('Work duration must be at least 1 minute.');
    }

    // handle time increase for work time plus button
    const incrementBreakTime = () => {
        if (parseInt(formState.breakTime) < parseInt(formState.workTime)) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, breakTime: parseInt(prevState.breakTime) + 1 }));
        } else if (!formState.breakTime) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, breakTime: 1 }));
        }
        setWarning('Break duration cannot be longer than work duration.');
    }

    // handle time decrease for work time minus button
    const decrementBreakTime = () => {
        if (parseInt(formState.breakTime) > 1) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, breakTime: parseInt(prevState.breakTime) - 1 }));
        } else if (!formState.breakTime) {
            setWarning('');
            return setFormState(prevState => ({ ...prevState, breakTime: 1 }));
        }
        setWarning('Break duration must be at least 1 minute.');
    }

    const closeModal = () => {
        // fade out and close out after 300ms animation
        setFadeOut(true);
        setTimeout(() => {
            setShowTimerOptions(false);
        }, 300);
    };

    // will trigger on key press
    const handleArrowKeys = (e) => {
        // checks for the up arrow key
        if (e.keyCode === 38) {
            // prevent default increase / decrease ---> only allow state change through previous functions
            e.preventDefault();
            // only two inputs, so if it is workTime input, increase work time else increase breakTime
            e.target.name === "workTime" ? incrementWorkTime() : incrementBreakTime()
        }
        // checks for the down arrow key 
        if (e.keyCode === 40) {
            e.preventDefault();
            e.target.name === "workTime" ? decrementWorkTime() : decrementBreakTime()
        }
    }

    const reset = () => {
        setWarning('');
        setFormState({
            workTime: 25,
            breakTime: 5
        });
    };

    return (
        <>
            <div className="modal-wrapper">
                <form
                    className={`modal-form timer-option-modal ${fadeOut ? 'slide-out' : 'slide-in'}`}
                    onSubmit={handleSubmit}
                >
                    <span
                        className="close-btn"
                        aria-label='close'
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon icon="window-close" />
                    </span>

                    <div className="excella-speech-label">
                        <ExcellaIcon />
                        <h2>Adjust the timer for your needs!</h2>
                    </div>
                    <div className="timer-input-container">
                        <label>Work: <input
                            name="workTime"
                            aria-label='work time'
                            value={formState.workTime}
                            ref={numberRef}
                            type='number'
                            className='timer-input'
                            onChange={handleChange}
                            onKeyDown={handleArrowKeys}
                        />
                            <div className='pm-btn-container'>
                                <button
                                    className='inc-btn'
                                    type='button'
                                    onClick={() => incrementWorkTime('workTime')}
                                >
                                    <FontAwesomeIcon icon='plus' />
                                </button>
                                <button
                                    className='dec-btn'
                                    type='button'
                                    onClick={() => decrementWorkTime()}
                                >
                                    <FontAwesomeIcon icon='minus' />
                                </button>
                            </div>

                            <span>minutes</span>

                        </label>

                        <label>Break: <input
                            name="breakTime"
                            aria-label='break time'
                            value={formState.breakTime}
                            type='number'
                            className='timer-input'
                            onChange={handleChange}
                            onKeyDown={handleArrowKeys}
                        />
                            <div className='pm-btn-container brk-btns'>
                                <button
                                    className='inc-btn'
                                    type='button'
                                    onClick={() => incrementBreakTime()}
                                >
                                    <FontAwesomeIcon icon='plus' />
                                </button>
                                <button
                                    className='dec-btn'
                                    type='button'
                                    onClick={() => decrementBreakTime()}
                                >
                                    <FontAwesomeIcon icon='minus' />
                                </button>
                            </div>
                            <span>minutes</span>
                        </label>
                    </div>
                    <p className='warning'>
                        {warning}
                    </p>
                    <button
                        className={`button ${success && 'success'}`}
                        onClick={handleSubmit}
                    >
                        {success ?
                            <FontAwesomeIcon icon="check" /> :
                            <><FontAwesomeIcon icon="save" /> Update</>
                        }
                    </button>
                    <button
                        className={`button ${success && 'success'}`}
                        name='save-defaults-btn'
                        onClick={handleSubmit}
                    >
                        {success ?
                            <FontAwesomeIcon icon="check" /> :
                            <><FontAwesomeIcon icon="cog" /> Make Default</>
                        }
                    </button>

                    <button
                        className="button"
                        onClick={() => reset()}
                    >
                        <FontAwesomeIcon icon="undo" /> Reset
                    </button>

                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>
    )
}

export default TimerOptions;

