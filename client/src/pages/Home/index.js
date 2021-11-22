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
        <section className="container">
            <div className="row optional-margin">
                <div className="col-4 col-lg-2 offset-1 home-sprite-wrapper">
                    <ExcellaIcon />
                </div>
                <div className="col-4">
                    <p className='speech-bubble speech-bubble-fade-in'>{speechBubbleText}</p>
                </div>
            </div>
            <div className="row">
                <div className=" offset-2 col-8 offset-md-1 col-md-10 offset-lg-3 col-lg-6 info-bubble">
                    <p>Here are some of the ways I can help...</p>
                    <h2><FontAwesomeIcon icon="tasks" /> Eisenhower Matrix</h2>
                    <div className="info-content">
                        <button className="forwards-btn">
                            <FontAwesomeIcon icon="chevron-left" />
                        </button>
                        <p>
                            The Eisenhower Matrix is an approach that attempts to make your daily and future tasks more managable. Unlike a simple todo list the Eisenhower Matrix requires that a task has to go in one of four categories: (1) DO: Urgent and must be done by you, (2) DELEGATE: Urgent and can be delegated to someone else, (3) DO LATER: Not urgent and can be done by you later, (4) DELETE Not pressing, can be deleted.
                        </p>
                        <button className="backwards-btn">
                        <FontAwesomeIcon icon="chevron-right" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Home;