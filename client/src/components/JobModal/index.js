import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { closeJobModal } from '../../redux/jobModal';
import { addJob, updateJob } from '../../redux/jobCRM';
import dayjs from 'dayjs';
import validateString from '../../utils/validateString';
import ExcellaIcon from '../ExcellaIcon';

const JobModal = () => {
    const dispatch = useDispatch();
    // useRef to track first text input (job title);
    const titleInputRef = useRef();
    const { job, update } = useSelector(state => state.jobModal);
    // use state to manage fade-in or fade-out of modal
    const [fadeOut, setFadeOut] = useState(false);
    // track warnings
    const [warning, setWarning] = useState('');
    // track form variables
    // use passed in variables for updating a task 
    const [formState, setFormState] = useState({
        jobTitle: job.jobTitle ? job.jobTitle : '',
        employer: job.employer ? job.employer : '',
        applicationStatus: job.applicationStatus ? job.applicationStatus : '',
    });
    // state variable to track the updateDate checkbox 
    const [updateDate, setUpdateDate] = useState(update);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState(prevFormState => (
            {
                ...prevFormState,
                [name]: value
            }
        ));
    }

    const toggleUpdateDate = () => {
        setUpdateDate(prevState => !prevState);
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
        const randId = Math.round(Math.random()*10000000000000);
        const jobItem = {
            _id: update ? job._id : randId,
            jobTitle: jobTitle.trim(),
            employer: employer.trim(),
            applicationStatus: applicationStatus.trim(),
            // if updateDate is true replace with current date, if false and the job exists, use previous value -> if the job does not exist use current date
            lastUpdated: updateDate ? dayjs().format('MM/DD/YYYY') : job.lastUpdated ? job.lastUpdated : dayjs().format('MM/DD/YYYY') ,
            contacts: update ? job.contacts : []
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

    // auto focus job title on open
    useEffect(() => {
        titleInputRef.current.focus();
    }, []);

    return (
        <>
            <div className="modal-wrapper">
                <form
                    className={`modal-form ${update ? 'update-job-modal' : 'add-job-modal'} ${fadeOut ? 'slide-out' : 'slide-in'}`}
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
                                ref={titleInputRef}
                                aria-label='jobTitle'
                                name='jobTitle'
                                type="text"
                                className="text-input"
                                value={formState.jobTitle}
                                onChange={handleChange}
                                placeholder='Job Title (*)'
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
                                placeholder='Employer (*)'
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
                                placeholder='Application Status (*)'
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon='clipboard'/>
                            </span>
                        </div>
                        {update && 
                        <div className="input-wrapper">
                            <label
                                className="checkbox-label"
                            >
                                <input
                                    name='updateDate'
                                    type='checkbox'
                                    className = 'input-checkbox'
                                    checked = {updateDate}
                                    onChange={() => toggleUpdateDate()}
                                /> Update date?
                            </label>
                        </div>
                        }
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