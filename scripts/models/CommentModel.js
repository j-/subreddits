define(function (require) {
	var ok = require('ok');
	var CommentModel = ok.Map.extend({
		defaults: {
			type: 't1'
		}
	});
	return CommentModel;
});