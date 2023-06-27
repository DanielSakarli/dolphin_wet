const knex = require('knex');
const { Model } = require('objection');
const knexfile = require('./knexfile');

function setupDevDb() {
	const db = knex(knexfile.development);
	Model.knex(db);
}

module.exports = setupDevDb;