import React from "react";
import ExcellaIcon from "../ExcellaIcon";
import './style.css';

const Loader = () => {
    return (
        <div className="loading-container" >
            <div className="loading-wrapper">
                <span>Loading</span>
                <div className="loader">

                    <ExcellaIcon />
                </div>
            </div>
        </div>
    );
};

export default Loader;