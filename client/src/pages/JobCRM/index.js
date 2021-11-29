import React, { useState } from "react";
import './style.css';
import { useSelector } from 'react-redux';
import JobTable from "../../components/JobTable";
import JobModal from '../../components/JobModal';
import JobCRMOptions from "../../components/JobCRMOptions";
import NavError from "../../components/NavError";
import { useQuery } from '@apollo/client';
import { QUERY_JOBS } from '../../utils/queries';
import Auth from "../../utils/Auth";

const JobCRM = () => {
    const { showJobModal } = useSelector(state => state.jobModal);
    const columnSizing = 'col-9 col-md-5 col-lg-4'

    const username = Auth.loggedIn() ? Auth.getTokenData().data.username : ''; 

    const { loading, data } = useQuery(QUERY_JOBS, {
        variables: {
            username
        }
    }); 

    const jobs = data?.jobs || []; 

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
                <JobCRMOptions jobs={jobs}/>
            </div>
      

            <div className="row">
                <div className={`col-10 col-md-8 col-lg-6 job-table-wrapper`}>
                    <JobTable jobs={jobs}/>
                </div>
            </div>
            {showJobModal && <JobModal />}
        </div>
    );
};

export default JobCRM;