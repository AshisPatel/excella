import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './style.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateJobModal } from "../../redux/jobModal";
import { deleteJob } from '../../redux/jobCRM';
import { setCurrentPage } from '../../redux/currentPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobModal from "../../components/JobModal";

const Job = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showJobModal } = useSelector(state => state.jobModal);
    // manage show / hide contacts
    const [showContacts, setShowContacts] = useState(false);
    const [expand, setExpand] = useState(true);
    // replace with query to get specific job
    const { jobs } = useSelector(state => state.jobCRM);
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState({ jobTitle: '', applicationStatus: '', employer: '', lastUpdated: '', _id: '' });

    const { _id } = useParams();
    // run this query to see if the job information has updated or not between the user upading the modal information 
    // triggered on showJobModal change
    useEffect(async () => {
        const dbJobs = [...jobs];
        let foundJob = {};
        for (let i=0; i < dbJobs.length; i++) {
            if(dbJobs[i]._id === parseInt(_id)) {
                foundJob = {...dbJobs[i]};
                break;
            }
        }
        setJob(foundJob);
        setLoading(false);
    }, [showJobModal]);


    if (loading) {
        console.log(jobs);
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

    const deleteBtnHandler = () => {

        dispatch(deleteJob(job._id));
        dispatch(setCurrentPage('/JobCRM'));
        navigate('/JobCRM');
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
                                <button
                                    onClick={() => deleteBtnHandler()}
                                >
                                    Delete
                                </button>
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