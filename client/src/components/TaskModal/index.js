import React, { useState, useEffect } from 'react';
import validatePassword from '../../utils/validatePassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExcellaIcon from '../ExcellaIcon';
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
    // array for setting radio buttons
    const categories = [
        { name: 'do', label: 'Do' },
        { name: 'doLater', label: 'Do Later' },
        { name: 'delegate', label: 'Delegate' },
        { name: 'delete', label: 'Delete' }
    ];
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
                    className={`modal-form task-modal ${fadeOut ? 'slide-out' : 'slide-in'}`}
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
                        <h2>What do you need to do?</h2>
                    </div>
                    <textarea
                        name="content"
                        value={formState.content}
                        onChange={handleChange}
                        placeholder="Enter task here..."
                        rows='2'
                    />
                    <div className="excella-speech-label">
                        <ExcellaIcon />
                        <h2 className="excella-speech-label">Select a category for this task!</h2>
                    </div>
                    <div className="radio-btn-wrapper">

                        {categories.map(category => (
                            <label className={formState.category === category.name && 'label-checked'} key={category.name}>
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.name}
                                    className="radio-input"
                                    onChange={handleChange}
                                />{category.label}
                            </label>
                        ))}
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