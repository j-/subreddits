define(function (require) {
	var ThingModel = require('models/ThingModel');
	var CommentModel = ThingModel.extend({
		defaults: {
			kind: 't1'
		}
	});
	return CommentModel;
});