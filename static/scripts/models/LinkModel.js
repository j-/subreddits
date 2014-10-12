define(function (require) {
	var ThingModel = require('models/ThingModel');
	var Thumbnail = require('properties/Thumbnail');
	var UTCDate = require('properties/UTCDate');
	var LinkModel = ThingModel.extend({
		schema: {
			thumbnail: Thumbnail,
			created_utc: UTCDate
		},
		defaults: {
			kind: 't3'
		}
	});
	return LinkModel;
});