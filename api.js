const { userRoute, boardRoute, listRoute } = require('./routes');


module.exports = (app) => {
	app.use('/user', userRoute);
	app.use('/board', boardRoute);
	app.use('/list', listRoute);
};