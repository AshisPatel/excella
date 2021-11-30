import React, { useEffect, useState } from 'react';
import './style.css';
import ExcellaShadowIcon from '../ExcellaShadowIcon';

const NavError = ({ message }) => {
    const [slideIn, setSlideIn] = useState(true);
    useEffect(() => {
        let timer1 = setTimeout(() => {
            setSlideIn(false);
        }, 500);
        // clearing timeout on unmount
        return () => {
            clearTimeout(timer1); 
        }
    }, []);
    return (
        <section className="container">
            <div className="row nav-error-margins">
                <div className={`col-4 col-lg-3 home-sprite-wrapper  ${slideIn ? 'excella-slide-in-nav-error' : 'hover-1'}`}>
                    <ExcellaShadowIcon />
                </div>
                <div className="col-4">
                    <p className='speech-bubble speech-bubble-fade-in'>
                        {message}
                    </p>
                </div>
            </div>
        </section>
    )
};

export default NavError;