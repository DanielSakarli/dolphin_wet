const { Model } = require('objection');

class Dolphins extends Model {
	static get tableName() {
		return 'dolphins';
	}

	static get idColumn() {
		return 'dolphin_id';
	}
}

module.exports = Dolphins;
