import React, { useState } from "react";
import './style.css';
import { useSelector } from 'react-redux';
import JobTable from "../../components/JobTable";
import JobModal from '../../components/JobModal';
import JobCRMOptions from "../../components/JobCRMOptions";
import NavError from "../../components/NavError";
import Auth from "../../utils/Auth";

const JobCRM = () => {
    const { showJobModal } = useSelector(state => state.jobModal);
    const columnSizing = 'col-9 col-md-5 col-lg-4'

    if (!Auth.loggedIn()) {
        return (
            <NavError message={'You need to be logged in to view this page!'} />
        )
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className={`page-title ${columnSizing}`}>
                    Job CRM
                </h1>
            </div>
            {/* <div className="row">
                <div className={`notification-wrapper ${columnSizing}`}>
                    Notifications will go here!
                </div>
            </div> */}
            <div className="row">
                <JobCRMOptions />
            </div>
      

            <div className="row">
                <div className={`col-10 col-md-8 col-lg-6 job-table-wrapper`}>
                    <JobTable />
                </div>
            </div>
            {showJobModal && <JobModal />}
        </div>
    );
};

export default JobCRM;