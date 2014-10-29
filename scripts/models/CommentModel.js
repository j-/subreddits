define(function (require) {
	var ThingModel = require('models/ThingModel');
	var UTCDate = require('properties/UTCDate');
	var CommentModel = ThingModel.extend({
		defaults: {
			kind: 't1'
		},
		schema: {
			created_utc: UTCDate
		}
	});
	return CommentModel;
});