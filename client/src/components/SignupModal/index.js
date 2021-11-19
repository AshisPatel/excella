import React, { useState } from "react";

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
                    <input
                        aria-aria-label='username'
                        name="username"
                        type="text"
                        value={formData.username}
                        placeholder="Username"
                    />
                    <input
                        aria-label="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="yourock@email.com"
                    />
                    <input
                        aria-label='password'
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        placeholder="Password"
                    />
                    <input
                        aria-label='confirm password'
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        placeholder="Confirm Password"
                    />
                </form>
            </div>
            <div className="modal-backdrop"></div>
        </>

    );
};

export default SignupModal;