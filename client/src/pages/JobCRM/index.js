import React, { useState } from "react";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobTable from "../../components/JobTable";
import JobModal from '../../components/JobModal';

const JobCRM = () => {
    const job = {};
    const columnSizing = 'col-9 col-md-5 col-lg-4'
    // temp state to manage view of JobModal
    const [showJobModal, setShowJobModal] = useState(false); 

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
                        onClick={() => setShowJobModal(true)}
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
            {showJobModal && <JobModal setShowJobModal={setShowJobModal}/>}
        </div>
    );
};

export default JobCRM;