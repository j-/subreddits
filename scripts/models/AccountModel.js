define(function (require) {
	var ThingModel = require('models/ThingModel');
	var AccountModel = ThingModel.extend({
		defaults: {
			kind: 't2'
		}
	});
	return AccountModel;
});