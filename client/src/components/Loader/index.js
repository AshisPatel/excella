import React from "react";
import ExcellaIcon from "../ExcellaIcon";
import './style.css';

const Loader = () => {
    return (
        <div className="loading-container">
             <span>Loading...</span>
            <div className="loader-wrapper">
               
                <ExcellaIcon />
            </div>
        </div>
    );
};

export default Loader;