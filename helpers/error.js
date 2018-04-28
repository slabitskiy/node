module.exports = (messages) => {
    const message = Array.isArray(messages) ? 
            messages.map(error => error.msg)[0]
            : messages;

    return {message}; 
};