// this function will see if there are any malicious characters in the string, and will return false if there are
// if there are no malicious chars,then we will return true

function validateString(string) {
    const malChars = /[:;!]/g;
    // spread the returned iterator in order to find all matches of the malicious character
    const foundChars = [...string.matchAll(malChars)];
    // check to see if a mal char wasfound, else return true for a valid string
    return foundChars.length > 0 ? false : true; 
}

export default validateString;