import React, { useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { updateContactModal } from '../../redux/contactModal';
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT } from '../../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactItem = ({ contact, job_id }) => {
    // import ability to delete contacts from the DB
    const [deleteContact] = useMutation(DELETE_CONTACT);
    const dispatch = useDispatch();
    const { firstName, lastName, phone, email, _id } = contact;
    // state to manage hovered or not to display option buttons
    const [hovered, setHovered] = useState(false);

    const deleteContactHandler = async () => {
        try {
            const { data } = await deleteContact({
                variables: {
                    _id
                }
            })
            console.log(data); 
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
        }
    }

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
                                onClick={() => deleteContactHandler()}
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