define(function (require) {
	var ThingModel = require('models/ThingModel');
	var SubredditModel = ThingModel.extend({
		defaults: {
			kind: 't5',
			display_name: null
		},
		toString: function () {
			return this.get('display_name');
		}
	});
	return SubredditModel;
});