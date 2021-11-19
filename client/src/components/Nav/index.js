import React from "react";

const Nav = () => {
    return (
        <nav className='d-flex justify-content-between'>
            <h1>Excella</h1>
            <div className='d-flex justify-content-between'>
                <button className='me-2'>Login</button>
                <button className='me-2'>Signup</button>
            </div>

        </nav>
    );
};

export default Nav;