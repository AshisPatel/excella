import React, { useEffect } from "react";
import './style.css';
import ExcellaIcon from "../ExcellaIcon";
import Auth from "../../utils/Auth";

const Nav = (props) => {
    
    const { setShowLogin, setShowSignup } = props;

    return (
        <nav id='top-nav'>
            <h1 id="logo">E<ExcellaIcon />cella</h1>

            <div className='btn-container'>
                {!Auth.loggedIn() &&
                    <>
                        <button
                            className='nav-btn'
                            onClick={() => setShowLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className='nav-btn'
                            onClick={() => setShowSignup(true)}
                        >
                            Signup
                        </button>
                    </>
                }
            </div>
        </nav>
    );
};

export default Nav;