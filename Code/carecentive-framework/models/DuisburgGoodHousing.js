const { Model } = require('objection');

class GoodHousing extends Model {
	static get tableName() {
		return 'duisburg_good_housing';
	}

	static get idColumn() {
		return 'housing_record_id';
	}
}

module.exports = GoodHousing;
