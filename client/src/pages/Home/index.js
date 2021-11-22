import React, { useState } from "react";
import './style.css';
import { useSelector } from "react-redux";
import ExcellaIcon from '../../components/ExcellaIcon';
import ExcellaShadowIcon from '../../components/ExcellaShadowIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowDimensions from "../../hooks/useWindowDimensions";


const Home = () => {
    const loggedIn = useSelector(state => state.loggedIn);
    const speechBubbleText = loggedIn ? "Hello, <username>! Let's have a wonderful day!" : "Hi, Friend! Excellence starts with you, and I'm here to help.";

   return (
        <section className = "container">
            <div className="row optional-margin">
                <div className="col-4 col-lg-2 offset-1 home-sprite-wrapper">
                    <ExcellaIcon />
                </div>
                <div className="col-4">
                    <p className='speech-bubble speech-bubble-fade-in'>{speechBubbleText}</p>
                </div>
            </div>
        </section>
    );
};

export default Home;