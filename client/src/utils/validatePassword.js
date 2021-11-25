function validatePassword(password) {
    const passwordFormat = /^[a-zA-Z0-9!@#$&()`+,/\".\\-]+$/

    return password.match(passwordFormat) ? true : false; 
}

export default validatePassword;