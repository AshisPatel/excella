import React, { useEffect, useState } from "react";
import './style.css';
import { useSelector } from "react-redux";
import ExcellaIcon from '../../components/ExcellaIcon';
import ExcellaShadowIcon from '../../components/ExcellaShadowIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowDimensions from "../../hooks/useWindowDimensions";


const Home = () => {
    const loggedIn = useSelector(state => state.loggedIn);
    const [fi, setFI] = useState(0)
    const speechBubbleText = loggedIn ? "Hello, <username>! Let's have a wonderful day!" : "Hi, Friend! Excellence starts with you, and I'm here to help.";
    const features = [
        {
            name: 'Eisenhower Matrix',
            icon: 'tasks',
            description: 'Conquer the day with the Eisenhower Matrix approach to todo lists!'
        },
        {
            name: 'Job CRM',
            icon: 'users',
            description: 'Stay on top of your job hunt with the Job CRM!'
        },
        {
            name: 'Pomodoro Timer',
            icon: 'clock',
            description: 'Increase productivity and decrease burnout with the Pomodoro Timer!'
        }
    ]

    // chooses which feature will be displayed in the info box
    let currentFeature = features[fi];

    // will handle 'forward-button' clicks
    const increaseFI = () => {
        // if the current feature is the last feature, return back to the first feature else + 1
        fi === features.length - 1 ? setFI(0) : setFI(fi => fi + 1);
    }
    // will handle 'backward-button' clicks
    const decreaseFI = () => {
        // if current feature is the first feature, set feature equal to the last feature in the array else - 1
        fi === 0 ? setFI(features.length - 1) : setFI(fi => fi - 1);
    }
    // will handle 'pagination' clicks
    const indexButtonClick = (e) => {
        const dataIndex = e.target.getAttribute('dataIndex');
        setFI(parseInt(dataIndex));
    }

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
                <div className="col-2 col-md-3"></div>
                <div className=" col-8 col-md-6 info-bubble">
                    <p>Here are some of the ways I can help...</p>
                    <h1>{currentFeature.name}</h1>
                    <div className="info-content">
                        <button
                            className="backwards-btn"
                            onClick={() => decreaseFI()}
                        >
                            <FontAwesomeIcon icon="chevron-left" />
                        </button>
                        <FontAwesomeIcon
                            icon={currentFeature.icon}
                            className="info-icon"
                        />
                        <button
                            className="forwards-btn"
                            onClick={() => increaseFI()}
                        >
                            <FontAwesomeIcon icon="chevron-right" />
                        </button>
                    </div>
                    <h2 className="info-description">
                        {currentFeature.description}
                    </h2>
                    <div className="index-btn-container">
                        {features.map((feature, index) => {
                            return (
                                <button
                                    className={`index-btn ${fi === index ? 'selected-index' : ''}`}
                                    dataIndex={index}
                                    onClick={indexButtonClick}
                                    key={index}
                                >
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;