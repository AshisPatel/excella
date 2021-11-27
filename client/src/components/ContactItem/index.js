import React, { useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { updateContactModal } from '../../redux/contactModal';
import { updateContact, deleteContact } from '../../redux/jobCRM';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactItem = ({ contact, job_id }) => {
    const dispatch = useDispatch();
    const { firstName, lastName, phone, email } = contact;
    // state to manage hovered or not to display option buttons
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className="contact-item"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <ul>
                <li>
                    First: {firstName}
                </li>
                <li>
                    Last: {lastName}
                </li>
                <li>
                    Phone: {phone ? phone : 'N/A'}
                </li>
                <li>
                    Email: {email ? email : 'N/A'}
                </li>
            </ul>
            <ul>
                {hovered &&
                    <>
                        <li>
                            <button
                                onClick={() => dispatch(updateContactModal(contact))}
                            >
                                <FontAwesomeIcon icon="edit" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => dispatch(deleteContact(job_id, contact._id))}
                            >
                                <FontAwesomeIcon icon="trash" />
                            </button>
                        </li>
                    </>
                }

            </ul>
        </div>
    );
};

export default ContactItem;