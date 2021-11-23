// temporary state until server side code for auth token is implemented

export const login = () => {
    return {
        type: "LOGIN"
    };
};

export const logout = () => {
    return {
        type: "LOGOUT"
    };
};

export default function loggedInReducer(loggedIn = false, { type }) {
    switch(type) {
        case "LOGIN":
            return true;
        case "LOGOUT":
            return false; 
        default: 
            return loggedIn
    }
}