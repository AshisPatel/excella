import React, { useEffect, useState } from 'react';
import './style.css';
import ExcellaShadowIcon from '../ExcellaShadowIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <div className='speech-bubble speech-bubble-fade-in'>
                        {message === 'Under construction, check back soon!' && <div className="hammer"><FontAwesomeIcon icon="hammer" /></div>}
                        {message}

                    </div>
                </div>
            </div>
        </section>
    )
};

export default NavError;