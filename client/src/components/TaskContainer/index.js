import React, { useState } from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskItem from "../TaskItem";
import { useMutation } from '@apollo/client';
import { QUERY_TASKS } from "../../utils/queries";
import { DELETE_TASKS_BY_CATEGORY } from "../../utils/mutations";
import Auth from "../../utils/Auth";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const TaskContainer = (props) => {
    const transitionWidth = 769;
    const { width } = useWindowDimensions();
    const username = Auth.getTokenData().data.username;
    // import mutation to delete tasks by category
    // update QUERY_TASKS to remove all tasks with the deleted category
    const [deleteTaskByCategory] = useMutation(DELETE_TASKS_BY_CATEGORY, {
        update(cache, { data: { deleteTaskByCategory } }) {
            // we will remove all tasks associated with the current task container's category
            try {
                cache.updateQuery({
                    query: QUERY_TASKS,
                    variables: {
                        username
                    }
                }, (data) => ({ tasks: data.tasks.filter(task => task.category !== category) }));
            } catch (err) {
                console.error(err);
            }
        }
    });

    // create a boolean state variable to see if the object is being hovered -> will allow for conditional rendering of delete all tasks in current category
    const [hovered, setHovered] = useState(false);
    const { categoryData, index, tasks } = props;
    const { title, category } = categoryData;
    // determine if the box is on the right or left for margin adjustments to keep boxes spaced around the center 
    const columnClass = index % 2 === 0 ? 'em-left-box' : 'em-right-box';

    // category returned from the server will be as one of a few potential enums, we need to convert these to the appropriate name of input in the form
    const categoryConvert = (category) => {
        switch (category) {
            case ('DO'):
                return 'do';
            case ('DO_LATER'):
                return 'doLater';
            case ('DELEGATE'):
                return 'delegate';
            case ('DELETE'):
                return 'delete';
            default:
                return 'do'
        };
    };

    const deleteCategoryTasksHandler = async () => {
        try {
            const { data } = await deleteTaskByCategory({
                variables: {
                    username,
                    category: categoryConvert(category)
                }
            })
            // console.log(`========================= Category tasks have been deleted===============`); 
            // console.log(data); 

        } catch (err) {
            console.error(err);
        }
    }

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
                    {width < transitionWidth ?
                        <span
                            aria-label="delete-category-tasks-btn"
                            className="clear-btn"
                            onClick={() => deleteCategoryTasksHandler()}
                        >
                            <FontAwesomeIcon icon='trash' />
                        </span>
                        :
                        hovered &&
                        <span
                            aria-label="delete-category-tasks-btn"
                            className="clear-btn"
                            onClick={() => deleteCategoryTasksHandler()}
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