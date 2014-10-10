define(function (require) {
	var ThingModel = require('models/ThingModel');
	var MessageModel = ThingModel.extend({
		defaults: {
			kind: 't4'
		}
	});
	return MessageModel;
});