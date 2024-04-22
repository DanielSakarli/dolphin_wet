const { Model } = require('objection');

class GoodHealth extends Model {
	static get tableName() {
		return 'good_health';
	}

	static get idColumn() {
		return 'health_record_id';
	}
}

module.exports = GoodHealth;
