import React from "react";
import './style.css';
import ExcellaIcon from "../ExcellaIcon";

const SlidingLoader = (props) => {
    const { modalType } = props; 
    return (
        <div className={`${modalType === 'updateJob' ? 'sl-container-update' : 'sl-container'}`}>
            <div className="sl-icon-wrapper">
                <ExcellaIcon />
            </div>
        </div>
    );
};

export default SlidingLoader;