const { Model } = require('objection');

class GoodHealth extends Model {
	static get tableName() {
		return 'nuernberg_emotional_state';
	}

	static get idColumn() {
		return 'emotional_state_record_id';
	}
}

module.exports = GoodHealth;