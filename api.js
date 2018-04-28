const { userRoute, boardRoute } = require('./routes');


module.exports = (app) => {
	app.use('/user', userRoute);
	app.use('/board', boardRoute);
};