import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { closeJobModal } from '../../redux/jobModal';
import validateString from '../../utils/validateString';
import ExcellaIcon from '../ExcellaIcon';

const JobModal = () => {
    const dispatch = useDispatch();
    const { job, update } = useSelector(state => state.jobModal);

    // use state to manage fade-in or fade-out of modal
    const [fadeOut, setFadeOut] = useState(false);
    // track warnings
    const [warning, setWarning] = useState('');
    // track form variables
    // use passed in variables for updating a task 
    const [formState, setFormState] = useState({
        title: job ? job.title : '',
        employer: job ? job.employer : '',
        status: job ? job.status : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState(prevFormState => (
            {
                ...prevFormState,
                [name]: value
            }
        ));
        console.log(formState);
    }

    const handleSubmit = (e) => {
        // check if inputs are present and valid add validators!!!
        const { title ,employer, status} = formState;
        e.preventDefault();
        if(!title || !validateString(title)) {
            return setWarning('Job title is blank or invalid');
        }
        if(!employer || !validateString(employer)) {
            return setWarning('Employer is blank or invalid');
        }
        if(!status || !validateString(status)) {
            return setWarning('Status is blank or invalid');
        }
        // submit here using graphQL and then trim the values prior to submission!
        setWarning('');
        closeModal(); 
    }

    const closeModal = () => {
        setFadeOut(true);
        setTimeout(() => {
            dispatch(closeJobModal());
        }, 300);
    }

    return (
        <>
            <div className="modal-wrapper">
                <form
                    className={`modal-form add-job-modal ${fadeOut ? 'slide-out' : 'slide-in'}`}
                    onSubmit={handleSubmit}
                >
                    <span
                        className="close-btn"
                        aria-label="close"
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon icon="window-close" />
                    </span>
                    <div className="excella-speech-label">
                        <ExcellaIcon />
                        <h2>Enter job information below!</h2>
                    </div>
                    <div className="inputs">
                        <div className="input-wrapper">
                            <input
                                aria-label='title'
                                name='title'
                                type="text"
                                className="text-input"
                                value={formState.title}
                                onChange={handleChange}
                                placeholder='Job Title(*)'
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon='hard-hat'/>
                            </span>
                        </div>

                        <div className="input-wrapper">
                            <input
                                aria-label='employer'
                                name='employer'
                                type="text"
                                className="text-input"
                                value={formState.employer}
                                onChange={handleChange}
                                placeholder='Employer(*)'
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon='briefcase'/>
                            </span>
                        </div>

                        <div className="input-wrapper">
                            <input
                                aria-label='status'
                                name='status'
                                type="text"
                                className="text-input"
                                value={formState.status}
                                onChange={handleChange}
                                placeholder='Application Status(*)'
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon='clipboard'/>
                            </span>
                        </div>
                    </div>
                    <p className="warning">
                        {warning}
                    </p>
                    <button
                        className="button"
                        // type="button"
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon="save" />
                        {update ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>
    );

};

export default JobModal;