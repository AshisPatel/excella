function validateUsername(username) {
    const usernameFormat = /^[a-zA-Z0-9.-]+$/

    return username.match(usernameFormat) ? true : false; 
}

export default validateUsername;