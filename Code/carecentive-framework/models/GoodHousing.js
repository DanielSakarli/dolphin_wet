const { Model } = require('objection');

class GoodHousing extends Model {
	static get tableName() {
		return 'good_housing';
	}

	static get idColumn() {
		return 'housing_record_id';
	}

	// static get relationMappings() {
	// 	// Import here to avoid require loop.
	// 	const { User } = require('@carecentive/carecentive-core/models/User');
	// 	const { Dolphin } = require('../models/Dolphins');
	// 	return {
	// 		Tester: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: User,
	// 			join: {
	// 				from: 'good_housing.housing_record_id',
	// 				to: 'User.id',
	// 			},
	// 		},
	// 		Dolphin: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: Dolphin,
	// 			to: 'User.id',
	// 			join: {
	// 				from: 'good_housing.housing_record_id',
	// 				to: 'Dolphin.Dolphin_id',
	// 			},
	// 		},
	// 	};
	// }
}

module.exports = GoodHousing;
