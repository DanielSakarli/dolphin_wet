const loadDummyUser = require('./dummy_users');
const loadDummyDolphins = require('./dummy_dolphins');
const loadDummyGoodFeeding = require('./dummy_good_feeding');
const loadDummyGoodHealth = require('./dummy_good_health');
const loadDummyGoodHousing = require('./dummy_good_housing');
const loadDummyBehaviour = require('./dummy_behaviour');
const loadDummyRole = require('./dummy_roles');

exports.seed = async function (knex) {
	// Insert dummy roles.
	await loadDummyRole();
	// Insert dummy users.
	await loadDummyUser();
	// Insert dummy dolphins.
	await loadDummyDolphins(knex);
	// Insert dummy good_feeding data.
	await loadDummyGoodFeeding(knex);
	// Insert dummy good_health data.
	await loadDummyGoodHealth(knex);
	// Insert dummy good_housing data.
	await loadDummyGoodHousing(knex);
	// Insert dummy behaviour data.
	await loadDummyBehaviour(knex);
	
};
