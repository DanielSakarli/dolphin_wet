const dbSetup = require('./db-setup');
const express = require('express');
const app = express();

/**
 * Constants
 */
const port = 5000;

/**
 * Database setup.
 */
dbSetup();

/**
 * Middleware
 */
app.use(express.json());

/**
 * Routes
 */
app.get('/', (req, res) => {
	res.send('<h1>Hello there! This is dolphin wet API.</h1>');
});
const dolphins = require('./routes/dolphins');
app.use('/api/dolphins', dolphins);

app.listen(port, () => {
	console.log(`Server is listening on ... ${port}`);
});
