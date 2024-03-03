var setup = require('./source/setup');
var createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const store = new session.MemoryStore();
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

// Try setting up a session storage for the photo path of the picture upload
app.use(session({
	secret: 'secret',
  	cookie: { maxAge: 1800000000 }, //300 minutes = 6 hours expiring of session cookie
	saveUninitialized: true,
	store: store,
	resave: true
}));

/**
 * Dolphin Wet Routers
 */
const dolphins = require('./routes/dolphins');
const good_feeding = require('./routes/good_feeding');
const good_health = require('./routes/good_health');
const good_housing = require('./routes/good_housing');
const behaviour = require('./routes/behabvior');
//const photoPath = require('./routes/photoPath');
const uploadPhoto = require('./photoUpload');
//const uploadPhotoPath = require('./photoUpload');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // https://ejs.co/

/**
 * Initialize ORM // https://en.wikipedia.org/wiki/Object-relational_mapping
 * Do not delete this line.
 */
require('@carecentive/carecentive-core/models/ORM');
// set up development database.
const setupDevDb = require('./db-setup');
const { error } = require('console');
setupDevDb();

/**
 * Set up middleware
 */
app.use(httplogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// Trying to update db with new data for dolphins reference area
/* app.post('/update', (req, res) => {
	const { dolphin_name, sex } = req.body;
		exports.up = function (knex) {
			return Promise.all([
		knex('dolphins')
		  .where('name', dolphin_name)
		  .update(sex)
		  .then(() => res.send('Update successful'))
		  .catch((e) => {
			console.error(e);
			res.status(500).send('An error occurred');

		  })
		]);
	  }
	  
	exports.down = function (knex) {
		return Promise.all([
			knex.schema.dropTable('dolphins'),
		]);
	};
	}
); */
	

/**
 * Set up cors policy //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * By default, the cors middleware will allow requests from all origins (*).
 * However, for security purposes, it's recommended to specify the allowed origins explicitly.
 */
app.use(cors());
const corsOptions = {
	// origin: 'http://localhost:8100', // Replace with your frontend app's origin
	origin: '*',
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
app.post('/api/photo', uploadPhoto);
//app.use('/api/photo', uploadPhotoPath);
//app.use('/api/photo', photoPath);

//////////////////////////////////////////////////
// Test Photo Upload
/*
const multer = require('multer');
// set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
		console.log(file.originalname);
		const { test_date, test_name } = req.body;
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		console.log(req.body.test_date);
		cb(
			null, // currently no error handling
			`${test_date}%${test_name}%${uniqueSuffix}${path.extname(
				file.originalname
			)}`
		);
	},
});

// init upload
const upload = multer({
	storage: storage
	// set the size limit of picture
	// limits: { fileSize: 10000000 },
});

/*
app.post('/api/photo', upload.single("file"), (req, res) => {
	res.send('File uploaded at: ' + req.file.path); //Access the file with req.file
});*/
///////////////////////////////////////////////////


///////////////////////////////////////////////////
// Session storage
app.post('/api/good_health', (req, res) => {
	try {
		const { eye_photo_path, teeth_photo_path } = req.body;
		req.session.photo_path = {
		eye_photo_path,
		teeth_photo_path
		};
		console.log('Photo_path in session storage')
	} catch(e) {
		console.log('Error occured while setting photo_path in session storage');
	}
	//res.json(req.session);
});
/*app.get('/api/photoPath', (req, res) => {
	// Responds with all the session storage
	res.json(req.session);
  });*/
///////////////////////////////////////////////////


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

// app.listen(process.env.HTTP_PORT, () => {
// 	console.log(`server is listening on... ${process.env.HTTP_PORT}`);
// });

module.exports = app;
