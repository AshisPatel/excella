import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';


const JobItem = () => {
    const { width } = useWindowDimensions();
    const _id = 10000; 
    return (
        <tr>
            <td><Link to ={`/JobCRM/${_id}`}>Full Stack Developer</Link></td>
            <td>Front End Co.</td>
            
            {width > 767 && 
                <>  
                    <td>Interview 1</td>
                    <td>11/21/21</td>
                </>
            }
        </tr>
    );
};

export default JobItem; 