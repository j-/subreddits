define(function (require) {
	var ok = require('ok');
	var CommentModel = require('models/CommentModel');
	var LinkModel = require('models/LinkModel');
	var Listing = ok.Collection.extend({
		getConstructor: function (item) {
			if (item.type === 't1') {
				return CommentModel;
			}
			else if (item.type === 't3') {
				return LinkModel;
			}
			else {
				throw new Error('Listing child type not recognised');
			}
		}
	});
	return Listing;
});