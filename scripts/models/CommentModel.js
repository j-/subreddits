define(function (require) {
	var ok = require('ok');
	var CommentModel = ok.Map.extend({
		defaults: {
			kind: 't1'
		}
	});
	return CommentModel;
});