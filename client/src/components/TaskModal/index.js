import React, { useState, useEffect } from 'react';
import validatePassword from '../../utils/validatePassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const TaskModal = (props) => {
    // manipulate state variable to show task modal 
    const { setShowTaskModal } = props;
    // set modal fade in or fade out animation
    const [fadeOut, setFadeOut] = useState(false);
    // track form variables
    const [formState, setFormState] = useState({
        content: '',
        category: ''
    });
    // warning message on form submission
    const { warning, setWarning } = useState('');

    // track change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevFormState => (
            {
                ...prevFormState,
                [name]: value
            }
        ));
    };

    // check inputs and then process task submission
    const handleSubmit = (e) => {
        // prevent page refresh
        e.preventDefault();

        const { content, category } = formState;
        // make sure content is not blank and that it is a valid input
        // using the validatePassword regex temporarily 
        if (!content || !validatePassword(content)) {
            return setWarning('Content is empty or invalid');
        }
        // check category
        if (!category) {
            return setWarning('A category must be selected');
        }
        // reset variables and close form
        // trim content before sending the value!!!
        // insert dispatch to update state here
        setWarning('');
        closeModal();
    }

    // close modal 
    const closeModal = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowTaskModal(false);
        }, 300);
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

                    <label for="content">What do you need to do?</label>
                    <textarea
                        name="content"
                        value={formState.content}
                        onChange={handleChange}
                        rows='2'
                    />
                    <label for="category">Choose a category:</label>
                    <div className="radio-btn-wrapper">
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="do"
                                className="radio-input"
                                onChange={handleChange}
                            />Do
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="doLater"
                                className="radio-input"
                                onChange={handleChange}
                            />Do Later
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="delegate"
                                className="radio-input"
                                onChange={handleChange}
                            />Delegate
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="delete"
                                className="radio-input"
                                onChange={handleChange}
                            />Delete
                        </label>
                    </div>
                    <button
                        className="button"
                        type="button"
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon icon="save" />
                        Save
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>
    )
};

export default TaskModal;