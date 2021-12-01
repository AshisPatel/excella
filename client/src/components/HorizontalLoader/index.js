import React from "react";
import './style.css';
import ExcellaIcon from "../ExcellaIcon";

const HorizontalLoader = (props) => {
    const { modalType } = props; 
    return (
        <div className={`${modalType === 'updateJob' ? 'sl-container-update' : 'sl-container'}`}>
            <div className="hl-icon-wrapper">
                <div className='icon-pulse-0'><ExcellaIcon /></div>
                <div className='icon-pulse-1'><ExcellaIcon  /></div>
                <div className='icon-pulse-2'><ExcellaIcon  /></div>
            </div>
        </div>
    );
};

export default HorizontalLoader;