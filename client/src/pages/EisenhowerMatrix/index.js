import React, { useState } from "react";
import './style.css';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import TaskContainer from "../../components/TaskContainer";
import ExcellaIcon from "../../components/ExcellaIcon";
import TaskModal from "../../components/TaskModal";

const EisenHowerMatrix = () => {
    // create stateVariable to use to display modal for creating / editting tasks
    const [showTaskModal, setShowTaskModal] = useState(false);
    const columnSizing = 'offset-1 col-9 offset-md-3 col-md-5 offset-lg-4 col-lg-4'

    const categories = [
        {
            title: 'Do'
        },
        {
            title: 'Do Later'
        },
        {
            title: 'Delegate'
        },
        {
            title: 'Delete'
        }
    ]

    return (
        <>
        <div className="container">
            <div className="row">
                <h1 className={`${columnSizing} em-title`}>Eisenhower Matrix</h1>
            </div>
            <div className="row">
                <div className={`${columnSizing} em-main-btn-wrapper`}>
                    <button
                        className="em-main-btn"
                        onClick={() => setShowTaskModal(true)}
                    >   
                        <FontAwesomeIcon icon="plus" />
                        Add Task
                    </button>
                    <button
                        className="em-main-btn delete-btn"
                    >
                        <FontAwesomeIcon icon="trash" />
                        Delete All
                    </button>
                </div>
            </div>
            <div className="row">
                {categories.map((category, index) => <TaskContainer title={category.title} index={index} key={category.title}/>)}
            </div>

        </div>
        {showTaskModal && <TaskModal setShowTaskModal={setShowTaskModal}/>}
        </>
    );
};

export default EisenHowerMatrix;