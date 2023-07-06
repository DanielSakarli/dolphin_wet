const { Model } = require('objection');

class GoodHealth extends Model {
	static get tableName() {
		return 'appropriate_behaviour';
	}

	static get idColumn() {
		return 'behaviour_record_id';
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
	// 				from: 'appropriate_behaviour.behaviour_record_id',
	// 				to: 'User.id',
	// 			},
	// 		},
	// 		Dolphin: {
	// 			relation: Model.BelongsToOneRelation,
	// 			modelClass: Dolphin,
	// 			join: {
	// 				from: 'appropriate_behaviour.behaviour_record_id',
	// 				to: 'Dolphin.Dolphin_id',
	// 			},
	// 		},
	// 	};
	// }
}

module.exports = GoodHealth;
