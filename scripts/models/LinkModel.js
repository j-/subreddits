define(function (require) {
	var ThingModel = require('models/ThingModel');
	var LinkModel = ThingModel.extend({
		defaults: {
			kind: 't3'
		}
	});
	return LinkModel;
});