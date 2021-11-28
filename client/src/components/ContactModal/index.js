import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExcellaIcon from '../ExcellaIcon';
import validateString from '../../utils/validateString';
import validateEmail from '../../utils/validateEmail';
import validateNumber from '../../utils/validateNumber';
import { useSelector, useDispatch } from 'react-redux';
import { closeContactModal } from '../../redux/contactModal';
import { addContact, updateContact } from '../../redux/jobCRM';

const ContactModal = (props) => {
    const { job_id } = props; 
    const dispatch = useDispatch();
    // get update boolean and passed in contact if modal is being opened to update a contact
    const { contact, update } = useSelector(state => state.contactModal);
    // manage fade-in vs fade-out animation
    const [fadeOut, setFadeOut] = useState(false);
    const [warning, setWarning] = useState('');
    const [formState, setFormState] = useState({
        firstName: contact?.firstName || '',
        lastName: contact?.lastName || '',
        email: contact?.email || '',
        phone: contact?.phone || ''
    });
    // useRef to track first input -> firstName
    const firstNameRef = useRef();
    // on launch auto-focus firstName input
    useEffect(() => { firstNameRef.current.focus() }, [])

    const handleSubmit = (e) => {
        // prevent refresh
        e.preventDefault();

        const { firstName, lastName, email, phone } = formState;

        if (!firstName || !validateString(firstName)) {
            return setWarning('Please include a valid first name')
        }

        if (!lastName || !validateString(lastName)) {
            return setWarning('Please include a valid last name')
        }

        if (email && !validateEmail(email)) {
            return setWarning('The entered email is invalid');
        }

        if (phone && !validateNumber(phone)) {
            return setWarning('The entered number is invalid')
        }

        // temporarily test the adding of a contact - replace with the object returend by graphQL

        const randId = Math.round(Math.random()*1000000000000000);
        const contactItem = {
            _id: update ? contact._id : randId,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email?.trim() || '',
            phone: phone?.trim() || ''
        };
        update ? dispatch(updateContact(job_id, contactItem)) : dispatch(addContact(job_id, contactItem));
        setWarning('');
        closeModal();
    }
    // make action call to global store to close contactModal
    const closeModal = () => {
        setFadeOut(true);
        setTimeout(() => {
            dispatch(closeContactModal());
        }, 300)
    }

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

    return (
        <>
            <div className="modal-wrapper">
                <form
                    className={`modal-form ${fadeOut ? 'slide-out' : 'slide-in'}`}
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
                        <h2>Enter contact information below!</h2>
                    </div>
                    <div className="inputs">
                        <div className="input-wrapper">
                            <input
                                ref={firstNameRef}
                                aria-label='firstName'
                                name="firstName"
                                type="text"
                                className="text-input"
                                value={formState.firstName}
                                onChange={handleChange}
                                placeholder="First Name (*)"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="user" />
                            </span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                aria-label='lastName'
                                name="lastName (*)"
                                type="text"
                                className="text-input"
                                value={formState.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="user" />
                            </span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                aria-label="email"
                                name="email"
                                type="email"
                                className="text-input"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Email"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="envelope" />
                            </span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                aria-label="phone"
                                name="phone"
                                type="tel"
                                className="text-input"
                                value={formState.phone}
                                onChange={handleChange}
                                placeholder="123-456-7890"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="phone" />
                            </span>
                        </div>
                    </div>
                    <p className="warning">
                        {warning}
                    </p>
                    <button
                        className="button"
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon="save" />
                        {update ? 'Update' : 'Create'}
                    </button>
                </form>
                <div className="modal-backdrop"></div>
            </div>
        </>
    );
};

export default ContactModal;