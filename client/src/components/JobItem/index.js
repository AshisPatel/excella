import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/currentPage';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';


const JobItem = ({ job }) => {
    // destructure job item 
    console.log(job);
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
                    <td>{lastUpdated}</td>
                </>
            }
        </tr>
    );
};

export default JobItem; 