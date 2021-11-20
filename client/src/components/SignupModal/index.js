import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupModal = ({ setShowSignup }) => {
    const [warning, setWarning] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState(prevFormState =>
            ({
                ...prevFormState,
                [name]: value
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

    return (
        <>
            <div className="modal-wrapper">
                <form className='sl-form'>
                    <div className="input-wrapper">
                        <input
                            aria-aria-label='username'
                            name="username"
                            type="text"
                            className="text-input"
                            value={formState.username}
                            onChange={handleChange}
                            placeholder="Username"
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
                        >
                            Show
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>

    );
};

export default SignupModal;