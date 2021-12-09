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

    }

    // handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
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
                        />
                            <div className='pm-btn-container'>
                                <button
                                    className='inc-btn'
                                    type='button'
                                >
                                    <FontAwesomeIcon icon='plus' />
                                </button>
                                <button
                                    className='dec-btn'
                                    type='button'
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
                        />
                            <div className='pm-btn-container brk-btns'>
                                <button
                                    className='inc-btn'
                                    type='button'
                                >
                                    <FontAwesomeIcon icon='plus' />
                                </button>
                                <button
                                    className='dec-btn'
                                    type='button'
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
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>
    )
}

export default TimerOptions;

