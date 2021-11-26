import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/currentPage';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';


const JobItem = ({ job }) => {
    // destructure job item 
    
    const { jobTitle, employer, applicationStatus, lastUpdated, _id } = job;
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    // const _id = 10000; 
    return (
        <tr>
            <td><Link to ={`/JobCRM/${_id}`} onClick={() => dispatch(setCurrentPage(`/JobCRM/${_id}`))}>{jobTitle}</Link></td>
            <td>{employer}</td>
            
            {width > 767 && 
                <>  
                    <td>{applicationStatus}</td>
                    <td>{lastUpdated}</td>
                </>
            }
        </tr>
    );
};

export default JobItem; 