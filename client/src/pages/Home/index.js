import React, { useState } from "react";
import './style.css';
import { useSelector } from "react-redux";
import ExcellaIcon from '../../components/ExcellaIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Home = () => {
    const [feature, setFeature] = useState('');
    const [fadeIn, setFadeIn] = useState(true);
    const [infoFade, setInfoFade] = useState(true);
    const loggedIn = useSelector(state => state.loggedIn);
    const firstBubbleText = loggedIn ? "Hello, <username>! Let's have a wonderful day!" : "Hello, friend! I'm Excella, Your new favorite producitivy suite";
    const secondBubbleText = loggedIn ? "Select one of my features to learn about!" : "Signup / Login to get started today,  select one of my features to learn about!";

    const features = [
        {
            feature: 'em',
            name: 'Eisenhower Matrix',
            icon: 'tasks',
            description: 'The Eisenhower Matrix is an approach that attempts to make your daily and future tasks more managable. Unlike a simple todo list the Eisenhower Matrix requires that a task has to go in one of four categories: (1) DO: Urgent and must be done by you, (2) DELEGATE: Urgent and can be delegated to someone else, (3) DO LATER: Not urgent and can be done by you later, (4) DELETE Not pressing, can be deleted.'
        },
        {
            feature: 'jc',
            name: 'Job CRM',
            icon: 'users',
            description: 'The Job CRM is an interface meant for recording and tracking your job applications. A job application can be added with its title, company, location, and application status. The Job CRM will ultimately include additional tools to let you sort your current applications, provide notifications if you may want to reach out about a specific application, and provide relevant jobs based on your application history!'
        },
        {
            feature: 'pt',
            name: 'Pomodoro Timer',
            icon: 'clock',
            description: 'The Pomodoro Timer is a technique utilized to help you improve your focus and stay on task. The goal is to work for 25 minutes and then take a 5 minute break. This cycle of work and rest is aimed at keeping you producitve for longer, while preventing burn out. The Pomodoro Timer will ultimately include tools to let you adjust time, and "store away" your break time in case you\'re on a roll and want to keep working. Ideally, in these scenarios we\'ll warn you when you should take a break to prevent burn out!'
        }
    ]

    const changeInfo = (feature) => {
        setFadeIn(false);
        setTimeout(() => {
            setFeature(feature);
            setInfoFade(true);
        }, 1000)
        
    };

    const goBack = () => {
        setInfoFade(false);
        setTimeout(() => {
            setFadeIn(true);
            setFeature('');
        }, 1000);
    };

    return (
        <div className="container">
            <div className="row sprite-row">
                <div className="home-sprite-wrapper offset-lg-1 offset-xl-3 col-1">
                    <ExcellaIcon />
                </div>
                <div className="col-2">
                    {feature === '' ?
                        <>
                            <p className={`speech-bubble first-bubble ${fadeIn ? 'first-bubble-fade-in' : 'first-bubble-fade-out'}`}>{firstBubbleText}</p>
                            <div className={`speech-bubble second-bubble ${fadeIn ? 'second-bubble-fade-in' : 'second-bubble-fade-out'}`}>
                                {secondBubbleText}
                                <ul className="features-list">
                                    {features.map(feature => {
                                        return (
                                            <li key={feature.feature}>
                                            <button
                                                className="feature-btn"
                                                onClick={() => changeInfo(feature)}
                                            >
                                                <FontAwesomeIcon icon={feature.icon} />
                                            </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                        </>
                        :
                        <>
                            <div className={`speech-bubble info-bubble ${infoFade ? 'info-bubble-fade-in' : 'info-bubble-fade-out'}`}>
                                <button 
                                    className="back-btn"
                                    onClick={() => goBack()}
                                >
                                    <FontAwesomeIcon icon="long-arrow-alt-left"/> Go Back
                                </button>
                                <h2><FontAwesomeIcon icon={feature.icon} /> {feature.name}</h2>
                                <p>{feature.description}</p>
                            </div>
                        </>
                    }
                </div>

            </div>
            <div style={{ width: 100, height: 300 }} />
        </div>

    );
};

export default Home;