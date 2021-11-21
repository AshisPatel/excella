import React from "react";
import './style.css';
import ExcellaIcon from '../../components/ExcellaIcon'

const Home = () => {
    return (
        <div className="container">
            <div className="row sprite-row">
                <div className="home-sprite-wrapper offset-1 offset-lg-2 col-1">
                    <ExcellaIcon />
                </div>
                <div className="col-2">
                    <p className="speech-bubble first-bubble">Hello friend! I'm Excella</p>
                    <p className="speech-bubble second-bubble">Signup / Login to get started today~! Or checkout some of my features!</p>
                </div>
                
            </div>
        </div>

    );
};

export default Home;