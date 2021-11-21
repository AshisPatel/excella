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
                <div className="col-2 speech-bubble">
                    <p>Hello friend! I'm Excella</p>
                </div>
            </div>
        </div>

    );
};

export default Home;