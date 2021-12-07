import React, { useState, useEffect, useRef } from 'react';
import ExcellaIcon from '../ExcellaIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TimerOptions = () => {

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
            // insert variable change to unmount modal
        }, 300);
    };

    return (
        <>
            <div className="modal-wrapper">
                <form 
                className={`modal-form task-modal ${fadeOut ? 'slide-out' : 'slide-n'}`}
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
                        <h2>Set your work cycle duration (minutes):</h2>
                    </div>

                    <input 
                        name="workTime"
                        aria-label='work time'
                        value={formState.workTime}
                        ref={numberRef}
                        type='number'
                        className='text-input'
                        placeholder='Work Time (minutes)'
                        onChange={handleChange}
                    />

                    <div className="excella-speech-label">
                        <ExcellaIcon />
                        <h2>Set your break cycle duration (minutes):</h2>
                    </div>

                    <input 
                        name="breakTime"
                        aria-label='break time'
                        value={formState.breakTime}
                        type='number'
                        className='text-input'
                        placeholder='Break Time (minutes)'
                        onChange={handleChange}
                    />

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

