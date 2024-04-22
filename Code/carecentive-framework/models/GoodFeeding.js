const { Model } = require('objection');

class GoodFeeding extends Model {
	static get tableName() {
		return 'good_feeding';
	}

	static get idColumn() {
		return 'feeding_record_id';
	}
}

module.exports = GoodFeeding;
