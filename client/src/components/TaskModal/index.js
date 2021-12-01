import React, { useState, useEffect, useRef } from 'react';
import validatePassword from '../../utils/validatePassword';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExcellaIcon from '../ExcellaIcon';
import HorizontalLoader from '../HorizontalLoader';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../../redux/eisenhowerMatrix';
import { closeTaskModal } from "../../redux/taskModal";
import { useMutation } from '@apollo/client';
import { ADD_TASK, UPDATE_TASK } from '../../utils/mutations';
import { QUERY_TASKS } from '../../utils/queries';
import Auth from '../../utils/Auth';


const TaskModal = () => {
    // get username from token
    const username = Auth.getTokenData().data.username;
    // import mutation to add tasks to DB
    // update cache of QUERY_TASKS
    const [addTask] = useMutation(ADD_TASK, {
        update(cache, { data: { addTask } }) {
            try {
                cache.updateQuery({
                    query: QUERY_TASKS,
                    variables: {
                        username
                    }
                }, (data) => ({ tasks: [...data.tasks, addTask]}))
            } catch(err) {
                console.error(err); 
            }
        }
    });
    // import mutation to update task in DB
    const [updateTask] = useMutation(UPDATE_TASK); 
    const dispatch = useDispatch();
    const { showTaskModal, task, update } = useSelector(state => state.taskModal);
    const { width } = useWindowDimensions();
    const transitionWidth = 767.9;
    // manipulate state variable to show task modal 
    // set modal fade in or fade out animation
    const [fadeOut, setFadeOut] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // category returned from the server will be as one of a few potential enums, we need to convert these to the appropriate name of input in the form
    const categoryConvert = (category) => {
        switch (category){
            case('DO'):
                return 'do';
            case('DO_LATER'):
                return 'doLater';
            case('DELEGATE'):
                return 'delegate';
            case('DELETE'):
                return 'delete';
            default:
                return 'do'
        };
    };
    // track original input if this is an update modal
    const [originalContent, setOriginalContent] = useState({
        taskContent: task.taskContent ? task.taskContent : '',
        category: task.category ? categoryConvert(task.category) : ''
    });
    // track form variables
    // use passed in variables for updating a task 
    const [formState, setFormState] = useState({
        content: task.taskContent ? task.taskContent : '',
        category: task.category ? categoryConvert(task.category) : ''
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
    const [characterCount, setCharacterCount] = useState(formState.content ? formState.content.length : 0);
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
    };

    // check inputs and then process task submission
    const handleSubmit = async (e) => {
        // prevent page refresh
        e.preventDefault();

        const { content, category } = formState;
        // make sure content is not blank and that it is a valid input
        // using the validatePassword regex temporarily 
        if (!content) {
            return setWarning('Content is empty or invalid');
        }
        // check category
        if (!category) {
            return setWarning('A category must be selected');
        }
        // reset variables and close form
        // trim content before sending the value!!!
        // this will be replaced when we can pass in the data from the useMutation hook
        const newTask = {
            username,
            taskContent: formState.content,
            category: formState.category
        }
        // update task if this is an update modal, else add task
        try {
            setLoading(true);
            if (!update) {
                const { data } = await addTask({
                    variables: {
                        complete: false,
                        ...newTask
                    }
                });
                } else {
                    // perform a shallow comparison to see if the objects are any different
                    // currently assuming that if the task is being updated it will be marked as not complete -> do a comparison to actually evaluate this after integrating other mutations
                    
                    let isContentSame = false; 
                    if (originalContent.taskContent === newTask.taskContent && originalContent.category === newTask.category) {
                        isContentSame = true; 
                    } 
                    // unless the task is already complete and the newTask category is delete 
                    if(task.complete && newTask.category === 'delete') {
                        isContentSame = true; 
                    }
                    const { data } = await updateTask({
                        variables: {
                            _id: task._id, 
                            complete: isContentSame,
                          ...newTask
                        }
                    });
            }
            setWarning('');
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    closeModal();
                }, 500);
            }, 1000);

        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
            setLoading(false);
            setWarning('There was a problem adding the task.')
        }
    }

    // close modal 
    const closeModal = () => {
        setFadeOut(true);
        setTimeout(() => {
            dispatch(closeTaskModal());
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
                        <h2>What's your task?</h2>
                    </div>

                    <textarea
                        name="content"
                        value={formState.content}
                        ref={textRef}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={handleChange}
                        disabled={characterCount > maxChars}
                        placeholder="Enter task here... (*)"
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
                            onChange={handleChange}
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
                        className={success ? 'button success' : 'button'}
                        // type="button"
                        onClick={handleSubmit}
                    >
                        {success ? <FontAwesomeIcon icon="check" /> : loading ? <HorizontalLoader /> : <><FontAwesomeIcon icon="save" /> {update ? 'Update' : 'Create'}</>}
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>
    )
};

export default TaskModal;