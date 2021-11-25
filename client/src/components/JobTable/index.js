import React from 'react';
import './style.css';
import JobItem from '../JobItem';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const JobTable = () => {
    const { width } = useWindowDimensions();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 9, 10];
    return (
        <table id='jobs'>
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
            {numbers.map(number => <JobItem />)}
        </table>
    )
}

export default JobTable;