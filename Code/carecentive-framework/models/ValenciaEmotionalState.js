const { Model } = require('objection');

class GoodHealth extends Model {
	static get tableName() {
		return 'valencia_emotional_state';
	}

	static get idColumn() {
		return 'emotional_state_record_id';
	}
}

module.exports = GoodHealth;
