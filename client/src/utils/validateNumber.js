function validateNumber(number) {
    const numberFormat = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

   return number.match(numberFormat) ? true : false; 
}

export default validateNumber; 