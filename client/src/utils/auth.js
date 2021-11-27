import decode from 'jwt-decode';

class AuthService {
    // retrieve data stored in token
    getTokenData() {
        return decode(this.getToken());
    }

    // check if the user is still logged in by finding a token that is unexpired
    loggedIn() {
        // check localStorage for token
        const token = this.getToken();
        // use type coersion to check if token is not undefined and the token is not expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token is expired
    isTokenExpired(token) {
        try {
            // decode token and see if the expiration date is less than now (comparing seconds)
            const decoded = decode(token);
            if (decoded.exp < Date.now()/1000) {
                return true;
            } else {
                return false; 
            }
        } catch (err) {
            return false; 
        }
    }

    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // set token to localStorageand reload page to homepage
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        // may need to set currentPage to '/' as well in reduxStore
    }
    
    // delete token from localStorage and take user back to homepage
    logout() {
        localStorage.removeItem('id_token');
        // may need to set currentPage to '/' as well in reduxStore
    }
}

export default new AuthService();
