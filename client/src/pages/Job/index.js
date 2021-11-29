import React, { useState } from 'react';
import dayjs from 'dayjs';
import './style.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateJobModal } from "../../redux/jobModal";
import { setCurrentPage } from '../../redux/currentPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobModal from "../../components/JobModal";
import ContactModal from '../../components/ContactModal';
import ContactItem from '../../components/ContactItem';
import NavError from '../../components/NavError';
import Loader from '../../components/Loader'; 
import { newContactModal } from '../../redux/contactModal';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_JOBS, QUERY_SINGLE_JOB } from '../../utils/queries';
import { DELETE_JOB } from '../../utils/mutations';
import Auth from '../../utils/Auth';

const Job = () => {
    const username = Auth.loggedIn() ? Auth.getTokenData().data.username : ''; 
    const { _id } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_JOB, {
        variables: {
            _id
        }
    }); 
    // updateCache to remove the deleted job 
    const [deleteJob, { error }] = useMutation(DELETE_JOB, {
        update(cache, { data: { deleteJob }}) {
            // the user could potentially navigate directly to the job page and delete the job, thus preventing QUERY_JOBS from ever having been called -> so we need to wrap this in a try...catch
            try {
                cache.updateQuery({
                    query: QUERY_JOBS,
                    variables: {
                        username
                    }
                }, (data) => ({ jobs: data.jobs.filter(job => job._id !== deleteJob._id)}))
            } catch(err) {
                console.error(err); 
            }
            // we will get all the jobs from the QUERY_JOBS query and set the jobs key equal to the array of all jobs that do not contain the _id of the deleted job. 
         
        }
    });

    const job = data?.singleJob || {}; 
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showJobModal } = useSelector(state => state.jobModal);
    const { showContactModal } = useSelector(state => state.contactModal);
    // manage show / hide contacts
    const [showContacts, setShowContacts] = useState(false);
    const [expand, setExpand] = useState(true);


    const showContactHandler = () => {
        if (showContacts) {
            setExpand(false);
            setTimeout(() => {
                setShowContacts(false);
            }, 200);
        } else {
            setShowContacts(true);
            setExpand(true);
        }
    }

    const deleteBtnHandler = async () => {
        try {
            const { data } = await deleteJob({
                variables: {
                    _id
                }
            });

            console.log(data); 
        } catch(err) {
            console.error(err);
            alert('There was a problem deleting this job!'); 
        }
        dispatch(setCurrentPage('/JobCRM'));
        navigate('/JobCRM');
    }

    if(!Auth.loggedIn()) {
        return (
            <NavError message={'You need to be logged in to view this page!'}/>
        )
    }

    
    if (loading) {
        return <Loader />
    }

    return (
        <div className="container">
            <div className="row">
                <Link
                    to="/JobCRM"
                    className="return-link"
                    onClick={() => dispatch(setCurrentPage('/JobCRM'))}
                >
                    <FontAwesomeIcon icon="hand-point-left" />
                    Return to Job CRM
                </Link>
            </div>
            <div className="row">
                <div className='col-9 col-md-7 col-lg-5 col-xl-4 job-card'>
                    <div className="job-info-container">
                        <ul className='job-info-list'>
                            <li>
                                <h3>
                                    <label>Title:</label>
                                    {job.jobTitle}
                                </h3>
                            </li>

                            <li>
                                <h3>
                                    <label>Employer:</label>
                                    {job.employer}
                                </h3>
                            </li>
                            <li>
                                <h3>
                                    <label>Status:</label>
                                    {job.applicationStatus}
                                </h3>
                            </li>
                            <li>
                                <h3>
                                    <label>Last Updated:</label>
                                    {dayjs(job.lastUpdated).format('MM/DD/YYYY')}
                                </h3>
                            </li>
                        </ul>
                        <ul className="job-options-list">
                            <li>
                                <button
                                    className="job-card-btn"
                                    onClick={() => dispatch(updateJobModal(job))}
                                >
                                    <FontAwesomeIcon icon="edit" />
                                    Update
                                </button>
                            </li>
                            <li>
                                <button
                                    className="job-card-btn"
                                    onClick={() => deleteBtnHandler()}
                                >
                                    <FontAwesomeIcon icon="trash" />
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                    <hr className="job-card-divider" />
                    <div className="job-contacts">
                        <span className="contact-header-wrapper">
                            <div>
                                <h3>
                                    Contacts
                                </h3>
                                <button
                                    className={`show-contact-btn ${showContacts ? 'rotate-up' : 'rotate-down'}`}
                                    onClick={() => showContactHandler()}
                                >
                                    <FontAwesomeIcon icon="caret-right" />
                                </button>
                            </div>
                            <div>
                                <button
                                    className="new-contact-btn job-card-btn"
                                    onClick={() => dispatch(newContactModal())}
                                >
                                    <FontAwesomeIcon icon="plus" /> New Contact
                                </button>
                            </div>
                        </span>
                        {showContacts &&
                            <>
                                <hr className="job-card-divider" />
                                <div className={`contact-list-container ${expand ? 'expand' : 'collapse'}`}>
                                    {job.contacts.length >0 ?
                                    
                                    job.contacts.map(contact => (
                                        <ContactItem key={contact._id} contact={contact} job_id={_id} />
                                    ))
                                    :
                                    'No contacts'
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            {showJobModal && <JobModal />}
            {showContactModal && <ContactModal job_id = {_id}/>}
        </div>
    );
};

export default Job;