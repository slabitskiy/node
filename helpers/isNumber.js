module.exports = value => {
    if (value === undefined || value === '') return false;
    
    return typeof value === 'number' ? `${value}` : false;
};