var setup = require('./source/setup');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var httplogger = require('morgan');
// Middleware for cross-origin policy
const cors = require('cors');

setup.setup();
const dotenv = require('dotenv');
dotenv.config();

/**
 * Carecentive-core routers
 */
var usersRouter = require('@carecentive/carecentive-core/routes/users');
var questionnaireRouter = require('@carecentive/carecentive-core/routes/questionnaires');
var measurementRouter = require('@carecentive/carecentive-core/routes/measurements');
var fileRouter = require('@carecentive/carecentive-core/routes/files');
var callbackRouter = require('@carecentive/carecentive-core/routes/callback');
var withingsRouter = require('@carecentive/carecentive-core/routes/settings');
var analyticsRouter = require('@carecentive/carecentive-core/routes/analytics');
var settingsRouter = require('@carecentive/carecentive-core/routes/settings');
var adminUsersRouter = require('@carecentive/carecentive-core/routes/admin/users');
var adminMeasurementsRouter = require('@carecentive/carecentive-core/routes/admin/measurements');
var activityRouter = require('./routes/activities');
var exampleRouter = require('./routes/examples');

var app = express();

/**
 * Dolphin Wet Routers
 */
const dolphins = require('./routes/dolphins');
const good_feeding = require('./routes/good_feeding');
const good_health = require('./routes/good_health');
const good_housing = require('./routes/good_housing');
const behaviour = require('./routes/behabvior');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Initialize ORM
 * Do not delete this line.
 */
require('@carecentive/carecentive-core/models/ORM');
// set up development database.
const setupDevDb = require('./db-setup');
setupDevDb();

/**
 * Set up middleware
 */
app.use(httplogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Set up cors policy
 * By default, the cors middleware will allow requests from all origins (*).
 * However, for security purposes, it's recommended to specify the allowed origins explicitly.
 */
app.use(cors());
const corsOptions = {
	origin: 'http://localhost:8100', // Replace with your frontend app's origin
};
app.use(cors(corsOptions));

/**
 * Core routes
 */
app.use('/api/admin/users', adminUsersRouter);
app.use('/api/admin/measurements', adminMeasurementsRouter);

app.use('/api/withings', withingsRouter);
app.use('/api/users', usersRouter);
app.use('/api/callback', callbackRouter);
app.use('/api/questionnaires', questionnaireRouter);
app.use('/api/measurements', measurementRouter);
app.use('/api/files', fileRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/settings', settingsRouter);

/**
 * Dolphin Wet Routes
 */
app.use('/api/dolphins', dolphins);
app.use('/api/good_feeding', good_feeding);
app.use('/api/good_health', good_health);
app.use('/api/good_housing', good_housing);
app.use('/api/behaviour', behaviour);

/**
 * Custom routes
 */
app.use('/api/activities', activityRouter);
app.use('/api/examples', exampleRouter);

// app.use('*', (req, res) =>
// 	res.sendFile(path.join(__dirname, 'public', 'index.html'))
// );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	// res.render('error');
	res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(process.env.HTTP_PORT, () => {
	// 	console.log(`server is listening on... ${process.env.HTTP_PORT}`);
});

module.exports = app;
