import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../../redux/eisenhowerMatrix';
import { updateTaskModal } from '../../redux/taskModal';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../../utils/mutations';
import './style.css';

const TaskItem = (props) => {
    // import mutation to update tasks in db
    const [updateTask] = useMutation(UPDATE_TASK);
    const { task } = props;
    const { taskContent, complete, _id } = task;
    const [hovered, setHovered] = useState(false);

    const dispatch = useDispatch();
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

    // update task status to be complete 
    const updateTaskStatus = async () => {
        const newTask = { ...task, category: categoryConvert(task.category), complete: !complete };
        try {
            const { data } = await updateTask({
                variables: {
                    _id,
                    ...newTask
                }
            });
            console.log(data); 
        } catch(err) {
            console.error(err); 
        }
       
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