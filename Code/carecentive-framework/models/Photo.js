const { Model } = require('objection');

class Photo extends Model {
	static get tableName() {
		return 'good_health'; //Here the photo paths are saved
	}

	static get idColumn() {
		return 'health_record_id';
	}

}

module.exports = Photo;
