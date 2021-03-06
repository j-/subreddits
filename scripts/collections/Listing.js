define(function (require) {
	var ok = require('ok');
	var CommentModel = require('models/CommentModel');
	var LinkModel = require('models/LinkModel');
	var Listing = ok.Collection.extend({
		getConstructor: function (item) {
			if (item.kind === 't1') {
				return CommentModel;
			}
			else if (item.kind === 't3') {
				return LinkModel;
			}
			else {
				throw new Error('Listing child kind not recognised');
			}
		},
		identify: function (item) {
			var items = this.items;
			for (var i = 0, l = items.length; i < l; i++) {
				if (items[i].get('id') === item.get('id')) {
					return items[i];
				}
			}
			return null;
		}
	});
	return Listing;
});