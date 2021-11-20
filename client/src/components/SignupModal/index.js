import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupModal = ({ setShowSignup }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <>
            <div className="modal-wrapper">
                <form className='sl-form'>
                    <div className="input-wrapper">
                        <input
                            aria-aria-label='username'
                            name="username"
                            type="text"
                            value={formData.username}
                            placeholder="Username"
                        />
                        <span className="icon-wrapper">
                            <FontAwesomeIcon icon="user"/>
                        </span>
                    </div>
                    <div className="input-wrapper">
                        <input
                            aria-label="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            placeholder="Email"
                        />
                        <span className="icon-wrapper">
                            <FontAwesomeIcon icon="envelope"/>
                        </span>
                    </div>
                    <div className="input-wrapper">
                        <input
                            aria-label='password'
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            placeholder="Password"
                        />
                        <span className="icon-wrapper">
                                <FontAwesomeIcon icon="lock"/>
                        </span>
                    </div>
                    <div className="input-wrapper">
                        <input
                            aria-label='confirm password'
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                        />
                        <span className="icon-wrapper">
                            <FontAwesomeIcon icon="lock"/>
                        </span>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>

    );
};

export default SignupModal;