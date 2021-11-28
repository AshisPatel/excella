import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";
import validateUsername from "../../utils/validateUsername";
import Auth from "../../utils/Auth";
import SlidingLoader from "../SlidingLoader";

const LoginModal = ({ setShowSignup, setShowLogin }) => {

    const [warning, setWarning] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check all inputs
        const {username, email, password} = formState; 
        if(!username || !validateUsername(username)) {
            return setWarning('Please include a valid username');
        }

        // if(!email || !validateEmail(email)) {
        //     return setWarning('Please include a valid email');
        // }

         // check valid password
        if(!password || !validatePassword(password)) {
            return setWarning('Please include a valid password');
        }

        // async query to see if this matches any valid user and then log in user 
        setLoading(true);
        setWarning('');
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            // replace with data returned by login mutation 
            const data = { 
                login: {
                    token: {
                        username
                    }
                }
            };
            Auth.login(data.login.token);
        }, 3000)

        setTimeout(() => {
            closeHandler();
        }, 3500);

     

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState(prevFormState =>
            ({
                ...prevFormState,
                [name]: value.trim()
            })
        );
    }

    const toggleShow = (e) => {
        e.preventDefault();
        setShowPassword(prevState => !prevState);
    }

    const closeHandler = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowLogin(false);
        }, 300)
    }

    const getSignup = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowLogin(false);
        }, 300)
        setTimeout(() => {
            setShowSignup(true);
        }, 300)
    }

    return (
        <>
            <div className="modal-wrapper">
                <form 
                    className={`modal-form ${fadeOut ? 'slide-out' : 'slide-in'}`}
                    onSubmit={handleSubmit}
                >
                    <span 
                        className="close-btn" 
                        aria-label="close"
                        onClick={closeHandler}    
                    >
                            <FontAwesomeIcon icon="window-close"/>
                    </span>
                    <h2>
                       <span>Excella</span> welcomes you!
                    </h2>
                    <div className="inputs">
                        <div className="input-wrapper">
                            <input
                                aria-label='username'
                                name="username"
                                type="text"
                                className="text-input"
                                value={formState.username}
                                onChange={handleChange}
                                placeholder="Username"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="user" />
                            </span>
                        </div>
                        {/* <div className="input-wrapper">
                            <input
                                aria-label="email"
                                name="email"
                                type="email"
                                className="text-input"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Email"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="envelope" />
                            </span>
                        </div> */}
                        <div className="input-wrapper">
                            <input
                                aria-label='password'
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="text-input"
                                value={formState.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="lock" />
                            </span>
                            <button
                                className={showPassword ? 'show-btn-clicked' : 'show-btn'}
                                onClick={toggleShow}
                                id='show-password'
                                type="button"
                            >
                                Show
                            </button>
                        </div>
                    </div>
                    <p className="warning">
                        {warning}
                    </p>
                    <button className={success ? 'button success' : 'button'}>
                        {
                            success ? <FontAwesomeIcon icon="check" /> : loading ? <SlidingLoader /> : "Login"
                        }
                    </button>
                    <span className="divider">Need to create an account?</span>
                    <button 
                        className="button"
                        type="button"
                        onClick={getSignup}
                        disabled={loading ? true : false}
                    >
                        Signup
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>

    );
};

export default LoginModal;