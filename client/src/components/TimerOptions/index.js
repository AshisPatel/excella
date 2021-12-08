import React, { useState, useEffect, useRef } from 'react';
import './style.css'; 
import ExcellaIcon from '../ExcellaIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TimerOptions = ({ setShowTimerOptions }) => {

    // initialize formState
    const [formState, setFormState] = useState({
        workTime: 25,
        restTime: 5
    });

    // initialize state variables for animations
    const [fadeOut, setFadeOut] = useState(false);
    const [success, setSuccess] = useState(false); 

    // useRef will target workTime input on modal open
    const numberRef = useRef();
    useEffect(() => {
        numberRef.current.focus();
    },[])

    // handle form submit
    const handleSubmit = (e) => {

    }

    // handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormState(prevState => ({...prevState, [name]:value}));
    }

    const closeModal = () => {
        // fade out and close out after 300ms animation
        setFadeOut(true); 
        setTimeout(() => {
            setShowTimerOptions(false); 
        }, 300);
    };

    return (
        <>
            <div className="modal-wrapper">
                <form 
                className={`modal-form timer-option-modal ${fadeOut ? 'slide-out' : 'slide-n'}`}
                onSubmit={handleSubmit}
                >
                    <span
                        className="close-btn"
                        aria-label='close'
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon icon="window-close"/>
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
                            className='number-input'
                            placeholder='Work Time'
                            onChange={handleChange}
                        /> minutes</label>

                        <label>Break: <input 
                            name="breakTime"
                            aria-label='break time'
                            value={formState.breakTime}
                            type='number'
                            className='number-input'
                            placeholder='Break Time'
                            onChange={handleChange}
                        /> minutes</label>
                    </div>
                    <button
                        className= {`button ${success && 'success'}`}
                        onClick={handleSubmit}
                    >
                        {success ? 
                        <FontAwesomeIcon icon="check"/> :
                        <><FontAwesomeIcon icon="save"/> Update</>
                    }
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>
    )
}

export default TimerOptions;

