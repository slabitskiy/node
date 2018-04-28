const { userRoute, boardRoute, listRoute, taskRoute } = require('./routes');


module.exports = (app) => {
	app.use('/user', userRoute);
	app.use('/board', boardRoute);
	app.use('/list', listRoute);
	app.use('/task', taskRoute);
};