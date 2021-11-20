import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import validateEmail from "../../utils/validateEmail";

const SignupModal = ({ setShowSignup }) => {
    const [warning, setWarning] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // check all inputs
        const {username, email, password, confirmPassword} = formState; 

        if(!username) {
            return setWarning('Please include a username');
        }

        if(!email || !validateEmail(email)) {
            return setWarning('Please include a valid email');
        }

         // check valid password
        if(!password) {
            return setWarning('Please include a valid password');
        }

        if(!confirmPassword) {
            return setWarning('Please confirm your password');
        }

        if(password !== confirmPassword) {
            return setWarning('Your password does not match')
        }

        // async query to create account here and set user to be logged in
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setWarning('');
            closeHandler();
        }, 3000)

     

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

    return (
        <>
            <div className="modal-wrapper">
                <form 
                    className={`sl-form ${fadeOut ? 'slide-out' : 'slide-in'}`}
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
                                aria-aria-label='username'
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
                        <div className="input-wrapper">
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
                        </div>
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
                        <div className="input-wrapper">
                            <input
                                aria-label='confirm password'
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className="text-input"
                                value={formState.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
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
                    <button className="button">
                        {loading ? "Creation In Progress..." : "Create Account"}
                    </button>
                    <span className="divider">Already have an account?</span>
                    <button className="button">
                        Login
                    </button>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>

    );
};

export default SignupModal;