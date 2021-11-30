import React, { useEffect, useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import JobItem from '../JobItem';
import NavError from "../NavError";
import useWindowDimensions from '../../hooks/useWindowDimensions';

import Auth from "../../utils/Auth";

const JobTable = ({ jobs }) => {
    // query for the user's jobs
 

    const { width } = useWindowDimensions();
    // Get jobs array from the global state jobCRM
    const { jobTitleFilter, employerFilter } = useSelector(state => state.jobCRM);
    const [displayedJobs, setDisplayedJobs] = useState(jobs); 
    // run this useEffect to update displayedJobs when anything that could change the relevant jobs to our search update, this is the filter that we impose on the employer / job title or the overall jobs list
    useEffect(() => {

        // if there are no filters, return out of function 
        if(!jobTitleFilter && !employerFilter) {
            return setDisplayedJobs([...jobs]); 
        }

        let relevantJobs = [...jobs];
        // parse through jobs array and check all job title's agains the filter
        if (jobTitleFilter) {
            relevantJobs = relevantJobs.filter(job => job.jobTitle.toLowerCase().trim() === jobTitleFilter);
        } 
         // parse remaining jobs through employer filter
        if (employerFilter) {
            relevantJobs = relevantJobs.filter(job => job.employer.toLowerCase().trim() === employerFilter); 
        }
        
        // set searchedJobs equal to relevantJobs
        setDisplayedJobs([...relevantJobs]);
        
    },[jobs, jobTitleFilter, employerFilter]);

    // useEffect(() => setDisplayedJobs([...jobs]), [loading]); 

    useEffect(() => console.log(displayedJobs), [displayedJobs]);

    if (displayedJobs.length === 0) {
        return (
            <NavError message="No jobs found!" />
        )
    }

    // if (loading) {
    //     return (<div>Loading</div>)
    // }


    return (
        <table id='jobs'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Employer</th>
                        
                        {width > 767 && 
                        <>
                            <th>Status</th>
                            <th> Date</th>
                        </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {displayedJobs.map(job => <JobItem job={job} key={job._id}/>)}
                </tbody>
        </table>
    )
}

export default JobTable;