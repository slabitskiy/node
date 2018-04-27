const { userRoute } = require('./routes');


module.exports = (app) => {
	app.use('/user', userRoute);
}