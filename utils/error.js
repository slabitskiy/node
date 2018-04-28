module.exports = (messages) => {
    const message = Array.isArray(messages) ? 
            messages.map(error => error.msg)
            : messages;

    return {message}; 
};