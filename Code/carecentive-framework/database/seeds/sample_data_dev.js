const loadDummyUser = require('./dummy_users');
const loadDummyDolphins = require('./dummy_dolphins');
const loadDummyGoodFeeding = require('./dummy_good_feeding');

exports.seed = async function (knex) {
	// Insert dummy users.
	await loadDummyUser();
	// Insert dummy dolphins.
	await loadDummyDolphins(knex);
	// Insert dummy good_feeding data.
	await loadDummyGoodFeeding(knex);
};