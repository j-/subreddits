define(function (require) {
	var ThingModel = require('models/ThingModel');
	var AccountModel = ThingModel.extend({
		defaults: {
			kind: 't2'
		},
		getUserPageURL: function () {
			return 'http://www.reddit.com/user/' + this.get('name');
		}
	});
	return AccountModel;
});