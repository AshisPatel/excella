import React from "react";
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { newJobModal } from "../../redux/jobModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobTable from "../../components/JobTable";
import JobModal from '../../components/JobModal';
import NavError from "../../components/NavError";
import Auth from "../../utils/Auth";

const JobCRM = () => {
    const dispatch = useDispatch();
    const { showJobModal } = useSelector(state => state.jobModal);
    const columnSizing = 'col-9 col-md-5 col-lg-4'

    if(!Auth.loggedIn()) {
        return (
            <NavError message={'You need to be logged in to view this page!'}/>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className={`page-title ${columnSizing}`}>
                    Job CRM
                </h1>
            </div>
            <div className="row">
                <div className={`notification-wrapper ${columnSizing}`}>
                    Notifications will go here!
                </div>
            </div>
            <div className="row">
                <div className={`jc-btn-wrapper ${columnSizing}`}>
                    <button
                        className='jc-main-btn'
                        onClick={() => dispatch(newJobModal())}
                    >
                        <FontAwesomeIcon icon="plus" />
                        Add Job
                    </button>
                    <button
                        className='jc-main-btn'
                    >
                        <FontAwesomeIcon icon="search" />
                        Search
                    </button>
                </div>
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