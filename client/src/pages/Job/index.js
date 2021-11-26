import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateJobModal } from "../../redux/jobModal";
import { setCurrentPage } from '../../redux/currentPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobModal from "../../components/JobModal";

const Job = () => {
    const dispatch = useDispatch();
    const { showJobModal } = useSelector(state => state.jobModal);
    // manage show / hide contacts
    const [showContacts, setShowContacts] = useState(false);
    const [expand, setExpand] = useState(true);
    // replace with query to get specific job
    const { jobs } = useSelector(state => state.jobCRM);
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState({jobTitle: '', applicationStatus: '', employer: '', lastUpdated: ''});

    const { _id } = useParams();
    
    useEffect(async () => {
        console.log(jobs);
        const foundJob = await jobs.filter(job => job._id = _id);
        setJob(foundJob[0]);
        // setTimeout(() => {setJob(foundJob[0])},1000);
        setTimeout(() => {setLoading(false)},500);
    }, []);
    

    if (loading) {
        return <div>Loading...</div>
    }



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
                                    {job.lastUpdated}
                                </h3>
                            </li>
                        </ul>
                        <ul className="job-options-list">
                            <li>
                                <button
                                    onClick={() => dispatch(updateJobModal(job))}
                                >Update</button>
                            </li>
                            <li>
                                <button>Delete</button>
                            </li>
                            <li>
                                <button>Add Contact</button>
                            </li>
                        </ul>
                    </div>
                    <hr className="job-card-divider" />
                    <div className="job-contacts">
                        <span className="contact-header-wrapper">
                            <h3>
                                Contacts
                            </h3>
                            <button
                                className={`show-contact-btn ${showContacts ? 'rotate-up' : 'rotate-down'}`}
                                onClick={() => showContactHandler()}
                            >
                                <FontAwesomeIcon icon="caret-right" />
                            </button>
                        </span>
                        {showContacts &&
                            <>
                                <hr className="job-card-divider" />
                                <div className={`contact-list-container ${expand ? 'expand' : 'collapse'}`}>
                                    {job.contacts.map(contact => (
                                        <ul className="contact-list">
                                            <li>
                                                First: {contact.firstName}
                                            </li>
                                            <li>
                                                Last: {contact.lastName}
                                            </li>
                                            <li>
                                                Phone: {contact.number ? contact.number : 'N/A'}
                                            </li>
                                            <li>
                                                Email: {contact.email ? contact.email : 'N/A'}
                                            </li>
                                        </ul>
                                    ))
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            {showJobModal && <JobModal />}
        </div>
    );
};

export default Job;