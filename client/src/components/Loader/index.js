import React from "react";
import ExcellaIcon from "../ExcellaIcon";
import './style.css';

const Loader = () => {
    return (
        <div className="loading-container" >
            <span>Loading</span>
            <div className="loading-wrapper">
                
                <div className="loader">

                    <ExcellaIcon />
                </div>
            </div>
        </div>
    );
};

export default Loader;