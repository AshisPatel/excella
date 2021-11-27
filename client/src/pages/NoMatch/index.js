import React from 'react';
import NavError from '../../components/NavError';

const NoMatch = () => {
    return (
        <NavError message="This is not the route that you are looking for..." />
    );
};

export default NoMatch; 