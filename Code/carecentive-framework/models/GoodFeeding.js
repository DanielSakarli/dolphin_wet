const { Model } = require('objection');

class GoodFeeding extends Model {
	static get tableName() {
		return 'good_feeding';
	}

	static get idColumn() {
		return 'feeding_record_id';
	}

	static get relationMappings() {
		// Import here to avoid require loop.
		const { User } = require('@carecentive/carecentive-core/models/User');
		const { Dolphin } = require('../models/Dolphins');
		return {
			Tester: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'good_feeding.feeding_record_id',
					to: 'User.id',
				},
			},
			Dolphin: {
				relation: Model.BelongsToOneRelation,
				modelClass: Dolphin,
				join: {
					from: 'good_feeding.feeding_record_id',
					to: 'Dolphin.Dolphin_id',
				},
			},
		};
	}
}

module.exports = GoodFeeding;
