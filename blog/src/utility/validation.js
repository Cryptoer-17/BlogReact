  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }  
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isUsername) {
        const pattern = /^[a-z0-9_]{4,15}$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    } 

    if (rules.isDate) {
        const pattern =/^\d{4}[./-]\d{2}[./-]\d{2}$/;
        isValid = pattern.test(value) && isValid
    } 
    return isValid;
}

export default checkValidity;