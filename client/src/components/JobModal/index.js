import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { closeJobModal } from '../../redux/jobModal';
import { addJob, updateJob } from '../../redux/jobCRM';
import dayjs from 'dayjs';
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
        jobTitle: job ? job.jobTitle : '',
        employer: job ? job.employer : '',
        applicationStatus: job ? job.applicationStatus : '',
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
        const { jobTitle ,employer, applicationStatus} = formState;
        e.preventDefault();
        if(!jobTitle || !validateString(jobTitle)) {
            return setWarning('Job title is blank or invalid');
        }
        if(!employer || !validateString(employer)) {
            return setWarning('Employer is blank or invalid');
        }
        if(!applicationStatus || !validateString(applicationStatus)) {
            return setWarning('Status is blank or invalid');
        }
        // submit here using graphQL and then trim the values prior to submission!
        // submit changes to global state
        // form object... (this will be replaced by the returned object from graphQL)
        const jobItem = {
            _id: update ? job._id : Math.round(Math.random()*1000),
            jobTitle: jobTitle.trim(),
            employer: employer.trim(),
            applicationStatus: applicationStatus.trim(),
            lastUpdated: dayjs().format('MM/DD/YYYY'),
            contacts: []
        };
        // check if update or adding new job
        update ? dispatch(updateJob(jobItem)) : dispatch(addJob(jobItem));
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
                                aria-label='jobTitle'
                                name='jobTitle'
                                type="text"
                                className="text-input"
                                value={formState.jobTitle}
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
                                aria-label='applicationStatus'
                                name='applicationStatus'
                                type="text"
                                className="text-input"
                                value={formState.applicationStatus}
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