import React, { useState } from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TaskContainer = (props) => {
    // create a boolean state variable to see if the object is being hovered -> will allow for conditional rendering of delete all tasks in current category
    const [hovered, setHovered] = useState(false);
    const { title, index  } = props;
    // determine if the box is on the right or left for margin adjustments to keep boxes spaced around the center 
    const columnClass =  index % 2 === 0 ? 'em-left-box' : 'em-right-box';

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
                    <span className="clear-btn">
                        <FontAwesomeIcon icon='trash' />
                    </span>
                }
            </div>

        </div>
        </>
    );
};

export default TaskContainer;