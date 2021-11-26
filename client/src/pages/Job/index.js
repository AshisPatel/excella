import React, { useState } from 'react';
import dayjs from 'dayjs';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Job = () => {
    const { _id } = useParams();
    const currentDate = dayjs().format('MM/DD/YYYY');
    const job = {
        title: 'Junior Developer',
        employer: 'Google Inc.',
        status: 'First Interview',
        date: currentDate,
        contacts: [
            {
                firstName: 'Ashis',
                lastName: 'Patel',
                number: '281-391-0069',
                email: 'ashis.n.patel@gmail.com'
            },
            {
                firstName: 'Ashis',
                lastName: 'Patel'
            },
            {
                firstName: 'Ashis',
                lastName: 'Patel',
                number: '281-391-0069',
                email: 'ashis.n.patel@gmail.com'
            },
            {
                firstName: 'Ashis',
                lastName: 'Patel',
                email: 'ashis.n.patel@gmail.com'
            },
            {
                firstName: 'Ashis',
                lastName: 'Patel',
                phone: '281-391-0069'
            }
        ]
    }
    const { title, employer, status, date, contacts } = job;

    // manage show / hide contacts
    const [showContacts, setShowContacts] = useState(false); 
    const [animationState, setAnimationState] = useState('expand');

    const showContactHandler = () => {
        if (showContacts) {
            setAnimationState('collapse');
            setTimeout(() => {
                setShowContacts(false);
            },200);
        } else {
            setShowContacts(true);
            setAnimationState('expand');
        }
    }
    return (
        <div className="container">
            <div className="row">
                <Link
                    to="/JobCRM"
                    className="return-link"
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
                                <h2>
                                    Title: {title}
                                </h2>
                            </li>

                            <li>
                                <h3>
                                    Employer: {employer}
                                </h3>
                            </li>
                            <li>
                                <h3>
                                    Status: {status}
                                </h3>
                            </li>
                            <li>
                                <h3>
                                    Last Update: {date}
                                </h3>
                            </li>
                        </ul>
                        <ul className="job-options-list">
                            <li>
                                <button>Update</button>
                            </li>
                            <li>
                                <button>Delete</button>
                            </li>
                            <li>
                                <button>Add Contact</button>
                            </li>
                        </ul>
                    </div>
                    <hr className="job-card-divider"/>
                    <div className="job-contacts">
                        <span className="contact-header-wrapper">
                            <h2>
                                Contacts 
                            </h2>
                            <button
                                className={`show-contact-btn ${showContacts ? 'rotate-up' : 'rotate-down'}`}
                                onClick={() => showContactHandler()}
                            >
                                <FontAwesomeIcon icon="caret-down"/>
                            </button>
                        </span>
                        {showContacts && 
                        <>
                            <hr className="job-card-divider"/>
                            <div className={`contact-list-container ${animationState === 'expand' ? 'expand' : 'collapse'}`}>
                                {contacts.map(contact => (
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
        </div>
    );
};

export default Job;