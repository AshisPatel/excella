import React from "react";
import './style.css';
import ExcellaIcon from "../ExcellaIcon";

const SlidingLoader = () => {
    return (
        <div className="sl-container">
            <div className="sl-icon-wrapper">
                <ExcellaIcon />
            </div>
        </div>
    );
};

export default SlidingLoader;