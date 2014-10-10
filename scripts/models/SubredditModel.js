define(function (require) {
	var ThingModel = require('models/ThingModel');
	var SubredditModel = ThingModel.extend({
		defaults: {
			kind: 't5',
			id: null
		},
		toString: function () {
			return this.get('id');
		}
	});
	return SubredditModel;
});