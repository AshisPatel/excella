import React, { useEffect, useState } from "react";
import './style.css';
import ExcellaShadowIcon from '../../components/ExcellaShadowIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from "../../utils/Auth";

const Home = () => {

    // instantiate variable to switch Excella's animations after a second
    const [slideIn, setSlideIn] = useState(true); 
    const [fi, setFI] = useState(0);
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
    ];

    const username = Auth.loggedIn() && Auth.getTokenData().data.username ;

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
        const dataindex = e.target.getAttribute('dataindex');
        setFI(parseInt(dataindex));
    }

    // useEffect to switch an animation variable for Excella -> sliding in to hovering 
    // timeout duration is with reference to the animation length for .slide-in
    useEffect(() => {
        setTimeout(() => {
            setSlideIn(false); 
        },500);
    }, []);

    return (
        <section className="container">
           
            <div className="row optional-margin">
                <div className={`col-4 col-lg-2 offset-1 home-sprite-wrapper ${slideIn ? 'excella-slide-in' : 'hover-1'}`}>
                    <ExcellaShadowIcon />
                </div>
                <div className="col-4">
                    <p className='speech-bubble speech-bubble-fade-in'>
                        {Auth.loggedIn() ? 
                            `Hello, ${username}! Let's have a wonderful day!`
                        : 
                            <><span className="emphasized-text">Excellence</span> starts with you. My name is <span className="emphasized-text">Excella</span> and I'm here to help.</>
                        }
                        </p>
                </div>
            </div>
            <div className="row">
                <div className="col-1 col-md-3"></div>
                <div className="col-8 col-md-6 info-bubble">
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
                                    dataindex={index}
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