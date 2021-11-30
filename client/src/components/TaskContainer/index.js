import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCategoryTasks } from "../../redux/eisenhowerMatrix";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskItem from "../TaskItem";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_TASKS } from "../../utils/queries";
import { DELETE_TASKS_BY_CATEGORY } from "../../utils/mutations";


const TaskContainer = (props) => {
    // import mutation to delete tasks by category
    // update QUERY_TASKS to remove all tasks with the deleted category
    const [deleteTaskByCategory] = useMutation(DELETE_TASKS_BY_CATEGORY);
    const dispatch = useDispatch();

    // create a boolean state variable to see if the object is being hovered -> will allow for conditional rendering of delete all tasks in current category
    const [hovered, setHovered] = useState(false);
    const { categoryData, index, tasks } = props;
    const { title, category } = categoryData;
    // determine if the box is on the right or left for margin adjustments to keep boxes spaced around the center 
    const columnClass = index % 2 === 0 ? 'em-left-box' : 'em-right-box';

    return (
        <>
            {/* This column is for extra spacing instead of using bootstraps offset, since offset is implemented as a margin and we need to use a negative margin for the left boxes to move them slightly to the left in order to be centered on large screens */}
            {index % 2 === 0 && <div className="col-lg-2 spacing-col"></div>}
            <div
                className={`offset-1 col-9 offset-lg-0 col-lg-4 ${columnClass} task-container`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="title-wrapper">
                    <h2>{title}</h2>
                    {hovered &&
                        <span
                            aria-label="delete-category-tasks-btn"
                            className="clear-btn"
                            onClick={() => dispatch(deleteCategoryTasks(category))}
                        >
                            <FontAwesomeIcon icon='trash' />
                        </span>
                    }

                </div>
                <ul className="task-list">
                    {
                        tasks.filter(task => task.category === category).map((task, index) => <TaskItem task={task} key={index} />)
                    }
                </ul>
            </div>
        </>
    );
};

export default TaskContainer;