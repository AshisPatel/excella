import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import JobItem from '../JobItem';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const JobTable = () => {
    const { width } = useWindowDimensions();
    // Get jobs array from the global state jobCRM
    const { jobs } = useSelector(state => state.jobCRM);
    console.log(jobs);
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
                    {jobs.map(job => <JobItem job={job} key={job._id}/>)}
                </tbody>
        </table>
    )
}

export default JobTable;