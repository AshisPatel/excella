import React from "react";
import './style.css';

const Nav = (props) => {

    const { setShowLogin, setShowSignup } = props; 

    return (
        <nav className='d-flex justify-content-between'>
            <h1>Excella</h1>
            <div className='d-flex justify-content-between my-auto'>
                <button 
                    className='me-2 nav-btn'
                    onClick={() => setShowLogin(true)}
                >Login</button>
                <button 
                    className='me-2 nav-btn'
                    onClick={() => setShowSignup(true)}
                >Signup</button>
            </div>
        </nav>
    );
};

export default Nav;