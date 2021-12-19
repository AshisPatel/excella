import React from 'react';

const JobBadge = ({ date }) => {

    const lastUpdatedDate = Date.parse(date);

    let dateDiff = Date.now() - lastUpdatedDate

    let daysPast = dateDiff/86400000;

    console.log(daysPast);

    //if the diference between the lastUpdated date and 'now' is greater than 7 days, display follow up badge
    if(daysPast > 7){

        return(
            <p>UPDATE BADGE HERE!</p>
        );
    } else {
        return(
            <p>NO UPDATE NEEDED!</p>
        );
    }
};

export default JobBadge;