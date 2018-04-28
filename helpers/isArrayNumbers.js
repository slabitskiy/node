module.exports = value =>  {
    if (value === undefined || value === '' || !Array.isArray(value)) return false;
    
    return value.every(el => typeof el === 'number')
};