import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowDimensions from '../../hooks/useWindowDimensions';


const JobItem = () => {
    const { width } = useWindowDimensions();
    return (
        <tr>
            <td>Full Stack Developer</td>
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