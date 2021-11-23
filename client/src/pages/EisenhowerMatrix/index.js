import React from "react";
import './style.css';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';

const EisenHowerMatrix = () => {

    const columnSizing = 'offset-1 col-9 offset-md-3 col-md-5 offset-lg-4 col-lg-3'

    return (
        <div className="container">
            <div className="row">
                <h1 className={`${columnSizing} em-title`}>Eisenhower Matrix</h1>
            </div>
            <div className="row">
                <div className={`${columnSizing} em-main-btn-wrapper`}>
                    <button
                        className="em-main-btn"
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

        </div>
    );
};

export default EisenHowerMatrix;