import React, { useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/currentPage';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import JobBadge from '../JobBadge';


const JobItem = ({ job }) => {
    // destructure job item 
    const { jobTitle, employer, applicationStatus, lastUpdated, _id } = job;
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    return (
        <tr>
            {/* onClick={() => dispatch(setCurrentPage(`/JobCRM/${_id}`))} */}
            <td><Link to ={`/JobCRM/${_id}`} >{jobTitle}</Link></td>
            <td>{employer}</td>
            
            {width > 767 && 
                <>  
                    <td>{applicationStatus}</td>
                    <td>{dayjs(lastUpdated).format('MM/DD/YYYY')}</td>
                    <td><JobBadge date={lastUpdated}/></td>
                </>
            }
        </tr>
    );
};

export default JobItem; 