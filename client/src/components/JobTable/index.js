import React from 'react';
import JobItem from '../JobItem';
import './style.css';

const JobTable = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 9, 10];
    return (
        <table id='jobs'>
            <tr>
                <th>Title</th>
                <th>Company</th>
                {/* <th>Status</th> */}
                <th>More</th>
            </tr>
            {numbers.map(number => <JobItem />)}
        </table>
    )
}

export default JobTable;