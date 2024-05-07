const { Model } = require('objection');

class GoodHealth extends Model {
	static get tableName() {
		return 'duisburg_appropriate_behaviour';
	}

	static get idColumn() {
		return 'behaviour_record_id';
	}
}

module.exports = GoodHealth;
