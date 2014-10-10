define(function (require) {
	var ok = require('ok');
	var SubredditModel = ok.Map.extend({
		defaults: {
			id: null
		},
		toString: function () {
			return this.get('id');
		}
	});
	return SubredditModel;
});