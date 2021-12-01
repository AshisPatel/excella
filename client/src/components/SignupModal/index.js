import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";
import validateUsername from "../../utils/validateUsername";
import HorizontalLoader from "../HorizontalLoader";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/Auth";

const SignupModal = ({ setShowSignup, setShowLogin }) => {

    // import ADD_USER mutation
    const [addUser, { error }] = useMutation(ADD_USER);

    const [warning, setWarning] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    // useRef to select first input, username
    const usernameRef = useRef();
    // auto focus username input on load
    useEffect(() => { usernameRef.current.focus() }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check all inputs
        const {username, email, password, confirmPassword} = formState; 

        if(!username || !validateUsername(username)) {
            return setWarning('Please include a valid username');
        }

        if(!email || !validateEmail(email)) {
            return setWarning('Please include a valid email');
        }

         // check valid password
        if(!password || !validatePassword(password)) {
            return setWarning('Please include a valid password');
        }

        if(!confirmPassword || !validatePassword(confirmPassword)) {
            return setWarning('Please confirm your password');
        }

        if(password !== confirmPassword) {
            return setWarning('Your password does not match')
        }

        // async query to create account here and set user to be logged in
        setLoading(true)
        setWarning('');
        try {
            const { data } = await addUser({
                variables: {
                    email,
                    username,
                    password
                }
            });
            // console.log(data); 
            // store token in localStorage
            setTimeout(() => {
                setLoading(false);
                setSuccess(true); 
                Auth.login(data.addUser.token);
                setTimeout(() => {
                    closeHandler()
                }, 500);
            },1000) 
        } catch(err) {
            console.error(err)
            setLoading(false);
            setWarning('There was a problem creating an account.');
        }
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
        const id = e.target.id; 

        if (id === 'show-password') {
            setShowPassword(prevState => !prevState);
        } else {
            setShowConfirmPassword(prevState => !prevState);
        }

    }

    const closeHandler = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowSignup(false);
        }, 300)
    }

    const getLogin = () => {
        setFadeOut(true);
        setTimeout(() => {
            setShowSignup(false);
        }, 300)
        setTimeout(() => {
            setShowLogin(true);
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
                       Start <span>excelling</span> with <span>Excella</span>
                    </h2>
                    <div className="inputs">
                        <div className="input-wrapper">
                            <input
                                ref={usernameRef}
                                aria-label='username'
                                name="username"
                                type="text"
                                className="text-input"
                                value={formState.username}
                                onChange={handleChange}
                                placeholder="Username (*)"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="user" />
                            </span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                aria-label="email"
                                name="email"
                                type="email"
                                className="text-input"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Email (*)"
                                autoComplete="off"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="envelope" />
                            </span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                aria-label='password'
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="text-input"
                                value={formState.password}
                                onChange={handleChange}
                                placeholder="Password (*)"
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
                        <div className="input-wrapper">
                            <input
                                aria-label='confirm password'
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className="text-input"
                                value={formState.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password (*)"
                            />
                            <span className="icon-wrapper">
                                <FontAwesomeIcon icon="lock" />
                            </span>
                            <button
                                className={showConfirmPassword ? 'show-btn-clicked' : 'show-btn'}
                                onClick={toggleShow}
                                id='show-confirm-password'
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
                        {success ? <FontAwesomeIcon icon="check" /> : loading ? <HorizontalLoader /> : "Create Account"}
                    </button>
                    <span className="divider">Already have an account?</span>
                    <button 
                        className="button"
                        type="button"
                        onClick={() => getLogin()}
                        disabled={loading ? true : false}
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>

    );
};

export default SignupModal;