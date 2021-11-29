import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { closeJobModal } from '../../redux/jobModal';
import dayjs from 'dayjs';
import validateString from '../../utils/validateString';
import ExcellaIcon from '../ExcellaIcon';
import SlidingLoader from '../SlidingLoader';
import { useMutation } from '@apollo/client';
import { ADD_JOB, UPDATE_JOB } from '../../utils/mutations';
import { QUERY_JOBS } from "../../utils/queries";
import Auth from '../../utils/Auth';

const JobModal = () => {
    // get username from token 
    const username = Auth.getTokenData().data.username;
    // import addJob mutation
    // need to update cache so new jobs on the JobTable component render 
    // update method will access our cache, and destructure out the data returned from the addJob mutation 
    const [addJob, { error }] = useMutation(ADD_JOB, {
        update(cache, { data: { addJob } }) {
            try {
                // we run the updateQuery function and pass in the query that we need to update along with any necessary variables for that query
                // we then run an update function on the data returned from the query, in this case we are going to update the jobs entry of the query by adding in all the previous jobs and the new job returned in addJob
                cache.updateQuery({
                    query: QUERY_JOBS,
                    variables: {
                        username
                    }
                }, (data) => ({ jobs: [...data.jobs, addJob] }))

            } catch (err) {
                console.error(err);
            }
        }
    });

    // Not 100% sure why I don't need to update anything here
    const [updateJob] = useMutation(UPDATE_JOB); 
    // set loading and success state for submitting data
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
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

    const handleSubmit = async (e) => {
        // check if inputs are present and validators
        const { jobTitle, employer, applicationStatus } = formState;
        e.preventDefault();
        if (!jobTitle || !validateString(jobTitle)) {
            return setWarning('Job title is blank or invalid');
        }
        if (!employer || !validateString(employer)) {
            return setWarning('Employer is blank or invalid');
        }
        if (!applicationStatus || !validateString(applicationStatus)) {
            return setWarning('Status is blank or invalid');
        }
        // submit here using graphQL and then trim the values prior to submission!
        // submit changes to global state
        // form object... (this will be replaced by the returned object from graphQL)
        // const randId = Math.round(Math.random()*10000000000000);
        // const jobItem = {
        //     _id: update ? job._id : randId,
        //     jobTitle: jobTitle.trim(),
        //     employer: employer.trim(),
        //     applicationStatus: applicationStatus.trim(),
        //     // if updateDate is true replace with current date, if false and the job exists, use previous value -> if the job does not exist use current date
        //     lastUpdated: updateDate ? dayjs().format('MM/DD/YYYY') : job.lastUpdated ? job.lastUpdated : dayjs().format('MM/DD/YYYY') ,
        //     contacts: update ? job.contacts : []
        // };
        // check if update or adding new job
        // update ? dispatch(updateJob(jobItem)) : dispatch(addJob(jobItem));
        setWarning('');
        if (!update) {
            try {
                setLoading(true);
                const { data } = await addJob({
                    variables: {
                        username,
                        jobTitle: jobTitle.trim(),
                        employer: employer.trim(),
                        applicationStatus: applicationStatus.trim(),
                        lastUpdated: dayjs().format('MM/DD/YYYY'),
                        contacts: []
                    }
                });
                // console.log(data); 
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        closeModal();
                    }, 500);
                }, 1000);

            } catch (err) {
                console.log(JSON.stringify(err, null, 2));
                setWarning('Problem submitting job info');
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const { data } = await updateJob({
                    variables: {
                        _id: job._id, 
                        jobTitle: jobTitle.trim(),
                        employer: employer.trim(),
                        applicationStatus: applicationStatus.trim(),
                        lastUpdated: updateDate ? dayjs().format('MM/DD/YYYY') : job.lastUpdated
                    }
                });
                console.log(data); 
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        closeModal();
                    }, 500);
                }, 1000);
            } catch (err) {

            }
        }

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
                                <FontAwesomeIcon icon='hard-hat' />
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
                                <FontAwesomeIcon icon='briefcase' />
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
                                <FontAwesomeIcon icon='clipboard' />
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
                                        className='input-checkbox'
                                        checked={updateDate}
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
                        className={success ? 'button success' : 'button'}
                        // type="button"
                        onClick={handleSubmit}
                    >
                        {success ? <FontAwesomeIcon icon="check" /> : loading ? <SlidingLoader /> : <><FontAwesomeIcon icon="save" /> {update ? 'Update' : 'Create'}</>}
                        {/* <FontAwesomeIcon icon="save" />
                        {update ? 'Update' : 'Create'} */}
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>
    );

};

export default JobModal;