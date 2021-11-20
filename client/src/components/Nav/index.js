import React from "react";
import './style.css';
// remove these once authentication is added
import { logout } from "../../redux/loggedIn";
import { useSelector, useDispatch } from "react-redux";

const Nav = (props) => {

    // remove these once authentication is added
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);

    const { setShowLogin, setShowSignup } = props;

    return (
        <nav className='d-flex justify-content-between'>
            <h1>Excella</h1>

            <div className='d-flex justify-content-between my-auto'>
                {loggedIn ?
                    <button
                        className='nav-btn'
                        onClick={() => dispatch(logout())}
                    >
                        Logout
                    </button>
                    :
                    <>
                        <button
                            className='me-2 nav-btn'
                            onClick={() => setShowLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className='me-2 nav-btn'
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