import React from "react";
import './style.css';
import ExcellaIcon from "../ExcellaIcon";
// remove these once authentication is added
import { logout } from "../../redux/loggedIn";
import { useSelector, useDispatch } from "react-redux";

const Nav = (props) => {

    // remove these once authentication is added
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);

    const { setShowLogin, setShowSignup } = props;

    return (
        <nav id='top-nav'>
            <h1 id="logo">E<ExcellaIcon />cella</h1>

            <div className='btn-container'>
                {!loggedIn &&
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