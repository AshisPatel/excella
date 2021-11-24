import React, { useState, useEffect, useRef } from 'react';
import validatePassword from '../../utils/validatePassword';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExcellaIcon from '../ExcellaIcon';


const TaskModal = (props) => {
    const { width } = useWindowDimensions();
    const transitionWidth = 767.9;
    // manipulate state variable to show task modal 
    const { setShowTaskModal, originalContent, originalCategory } = props;
    // set modal fade in or fade out animation
    const [fadeOut, setFadeOut] = useState(false);
    // track form variables
    // use passed in variables for updating a task 
    const [formState, setFormState] = useState({
        content: originalContent ? originalContent : '',
        category: originalCategory ? originalCategory : ''
    });
    // warning message on form submission
    const [warning, setWarning] = useState('');
    // array for setting radio buttons
    const categories = [
        { name: 'do', label: 'Do' },
        { name: 'doLater', label: 'Do Later' },
        { name: 'delegate', label: 'Delegate' },
        { name: 'delete', label: 'Delete' }
    ];
    // enforce character limit on tasks
    // if the modal is being used to update a task use the passed in content.length otherwise use 0. 
    const [characterCount, setCharacterCount] = useState(originalContent ? originalContent.length : 0);
    const maxChars = 100;

    // useRef to track if textarea is focused
    const textRef = useRef();
    // see if textArea is focused
    const [focused, setFocused] = useState(true);
    // track change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        // check content length 
        if (name === 'content') {
            if (value.length <= maxChars) {
                setCharacterCount(value.length);
            } else {
                return;
            }
        }
        setFormState(prevFormState => (
            {
                ...prevFormState,
                [name]: value
            }
        ));

        console.log(formState);
    };

    // check inputs and then process task submission
    const handleSubmit = (e) => {
        console.log('oi')
        // prevent page refresh
        e.preventDefault();

        const { content, category } = formState;
        // make sure content is not blank and that it is a valid input
        // using the validatePassword regex temporarily 
        console.log(category);
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

    // automatically focus the textarea on render
    useEffect(() => {
        textRef.current.focus();
    }, []);

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
                        ref={textRef}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={handleChange}
                        disabled={characterCount > maxChars}
                        placeholder="Enter task here..."
                        rows='4'
                    />
                    <span className={`char-count ${!focused && 'hide'}`}>
                        {characterCount} / {maxChars}
                    </span>
                    <div className="excella-speech-label">
                        <ExcellaIcon />
                        <h2 className="excella-speech-label">Select a category for this task!</h2>
                    </div>
                    {width > transitionWidth ?
                        <div className="radio-btn-wrapper">

                            {categories.map(category => (
                                <label className={formState.category === category.name ? 'label-checked' : null} key={category.name}>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category.name}
                                        className="radio-input"
                                        checked={formState.category === category.name}
                                        onChange={handleChange}
                                    />{category.label}
                                </label>
                            ))}
                        </div>

                        :   
                        <select 
                            value={formState.category}
                            name="category"
                        >
                            <option value="">Select a category</option>
                            <option value="do">Do</option>
                            <option value="doLater">Do Later</option>
                            <option value="delegate">Delegate</option>
                            <option value="delete">Delete</option>
                        </select>
                    }

                    <p className="warning">
                        {warning}
                    </p>
                    <button
                        className="button"
                        type="button"
                        onClick={handleSubmit}
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