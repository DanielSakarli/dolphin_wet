const { Model } = require('objection');

class Dolphins extends Model {
	static get tableName() {
		return 'dolphins';
	}
}

module.exports = Dolphins;
