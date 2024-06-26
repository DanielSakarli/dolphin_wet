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

var app = express();


setup.setup();
const dotenv = require('dotenv');
dotenv.config();


/**
 * Carecentive-core routers
 */
var usersRouter = require('./carecentive/carecentive-core/routes/users'); // @carecentive/carecentive-core/routes/users
var questionnaireRouter = require('./carecentive/carecentive-core/routes/questionnaires');
var measurementRouter = require('./carecentive/carecentive-core/routes/measurements');
var fileRouter = require('./carecentive/carecentive-core/routes/files');
var callbackRouter = require('./carecentive/carecentive-core/routes/callback');
var withingsRouter = require('./carecentive/carecentive-core/routes/settings');
var analyticsRouter = require('./carecentive/carecentive-core/routes/analytics');
var settingsRouter = require('./carecentive/carecentive-core/routes/settings');
var adminUsersRouter = require('./carecentive/carecentive-core/routes/admin/users');
var adminMeasurementsRouter = require('./carecentive/carecentive-core/routes/admin/measurements');
var activityRouter = require('./routes/activities');
var exampleRouter = require('./routes/examples');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // https://ejs.co/

/**
 * Initialize ORM // https://en.wikipedia.org/wiki/Object-relational_mapping
 * Do not delete this line.
 */
require('./carecentive/carecentive-core/models/ORM');
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

/**
 * Set up session storage
 */
//app.set('trust proxy', 1); // test to trust the proxy with a cookie
// Try setting up a session storage for the photo path of the picture upload
/*app.use(session({
	secret: 'secret',
  	cookie: { httpOnly: true, maxAge: 3600000, secure: false, sameSite: 'lax' }, //300 minutes = 6 hours expiring of session cookie
	saveUninitialized: true,
	store: store,
	resave: true,
	//proxy: true,
	name: 'session' //Try giving a name to the cookie
}));*/

// Trying to visualize the headers of incoming requests:
app.use(function(err, req, res, next) {
	console.log('Incoming Reuqest Headers:', req.headers);
	console.log('Incoming Request Body:', req.body);
	//next();
	/*if (err) {
		console.log('Error:', err.stack); // Log error stack trace to the console
		res.status(500).send('Something broke!');
	  } else {
		next();
	  }*/
});





/**
 * Dolphin Wet Routers
 */
const dolphins = require('./routes/dolphins');
const uploadPhoto = require('./routes/photoPath');
const uploadVideo = require('./routes/video_upload');
const good_feeding = require('./routes/good_feeding');
const good_health = require('./routes/good_health');
const good_housing = require('./routes/good_housing');
const behaviour = require('./routes/behabvior');
const emotional_state = require('./routes/emotional_state');
const csvWriter = require('./routes/csv_writer');
//const uploadPhoto = require('./controllers/photoUpload');
const uploadFile = require('./fileUpload');

//const uploadPhotoPath = require('./photoUpload');



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
//app.use(cors());
const allowedOrigins = ['http://localhost:8100', 'https://localhost', 'capacitor://localhost'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  secure: true,
  httpOnly: false,
  sameSite: 'none',
  name: 'cookie' //Try giving a name to the cookie
};
app.use(cors(corsOptions));

// Set headers because of server side CORS policy
app.use(function(req, res, next) {
	const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/**
 * Setup session storage
 */
app.use(
    session({
        secret: 'secret',
        cookie: { httpOnly: true, maxAge: 3600000, secure: true, sameSite: 'none' }, //1 hour expiring of session cookie
        saveUninitialized: true,
        store: store,
        resave: true,
        proxy: true,
        name: 'session' //Try giving a name to the cookie
    })
);
app.post('/api/setup_session_storage', (req, res, next) => {
	try {
		// Initializing with 'empty', because if we initialize with '' the sessionStorage isn´t actually initialized
		req.session.photo_type= 'empty';// = photo_type; // Either 'eye', 'teeth' or 'marks'
		req.session.dolphin_name = 'empty'; //dolphin_name;
		req.session.photo_path = {
			eye_photo_path: 'empty',
			teeth_photo_path: 'empty',
			odontogramm_photo_path: 'empty',
			marks_photo_path: 'empty',
			silhouette_photo_path: 'empty'
		};
		req.session.video_path = 'empty'; 
		req.session.file_path = []; //file_path; // For the nutrition section, laboratory data files
		// Index used in photoUpload.js to upload for different dolphins in the
		// same test upload. Reset the index after photo paths are uploaded into db
		req.session.dolphinIndex = 0;
		req.session.save(err => {
			if (err) {
			  console.log('Error occurred while initializing session storage', err);
			  return res.sendStatus(500);
			}
	  
			console.log('Session storage initialized');
			res.sendStatus(201);
		  });
	} catch(e) {
		console.log('Error occured while initializing session storage', e);
		res.sendStatus(500);
	}
});
///////////////////////////////////////////////////

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
//app.use('/api/files', fileRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/settings', settingsRouter);

/**
 * Dolphin Wet Routes
 */
app.use('/api/dolphins', dolphins);
app.use('/api/good_feeding', good_feeding);
app.use('/api/photo', uploadPhoto);
app.use('/api/video', uploadVideo);
app.use('/api/good_health', good_health);
app.use('/api/good_housing', good_housing);
app.use('/api/behaviour', behaviour);
app.use('/api/emotional_state', emotional_state);
app.post('/api/file', uploadFile);
app.use('/api/export-csv', csvWriter);
// For example eye, teeth, odontogramm, or rake mark image files
app.use('/api/images', express.static(path.join(__dirname,'uploads/images'))); //gets the images with the url http://localhost:3309/images/ + filename
// Laboratory data files: e.g. food quality
app.use('/api/files', express.static(path.join(__dirname,'uploads/files'))); //gets the files with the url http://localhost:3309/files/ + filename
// Video files
app.use('/api/videos', express.static(path.join(__dirname,'uploads/videos'))); //gets the videos with the url http://localhost:3309/videos/ + filename

/**
 * Custom routes
 */
app.use('/api/activities', activityRouter);
app.use('/api/examples', exampleRouter);

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
