import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../../redux/eisenhowerMatrix';
import { updateTaskModal } from '../../redux/taskModal';
import TaskModal from '../TaskModal';
import './style.css';

const TaskItem = (props) => {
    const { task } = props;
    const { taskContent, complete, _id } = task;
    const [showTaskModal, setShowTaskModal] = useState(false); 
    const [hovered, setHovered] = useState(false);

    const dispatch = useDispatch();

    // update task status to be complete 
    const updateTaskStatus = () => {
        const newTask = { ...task, complete: !complete };
        dispatch(updateTask(newTask));
    }

    // delete this specific task
    const deleteTaskHandler = () => {
        dispatch(deleteTask(_id));
    }

    return (
            <li
                className="task-list-item"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="task-item-content-wrapper">
                    <button
                        className="task-item-btn"
                        onClick={() => updateTaskStatus()}
                    >
                        {complete ? <FontAwesomeIcon icon="check-square" /> : <FontAwesomeIcon icon="square" />}
                    </button>
                    <span className={`task-item-content ${complete && 'line-through'}`}>{taskContent}</span>
                </div>


                {
                    hovered &&
                    <div className="task-item-btn-wrapper">
                        <button
                            className="task-item-btn"
                            onClick={() => dispatch(updateTaskModal(task))}
                        >
                            <FontAwesomeIcon icon="edit" />
                        </button>
                        <button
                            className="task-item-btn"
                            onClick={() => deleteTaskHandler()}
                        >
                            <FontAwesomeIcon icon="trash" />
                        </button>
                    </div>
                }
            </li>
    )
}

export default TaskItem;