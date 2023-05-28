// Update with your config settings.
const { knexSnakeCaseMapper } = require('objection');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: '127.0.0.1',
			port: 3306,
			user: 'root',
			password: 'password',
			database: 'dolphin_wet',
		},
		seeds: {
			directory: './seeds',
		},
	},
	...knexSnakeCaseMapper,
};
