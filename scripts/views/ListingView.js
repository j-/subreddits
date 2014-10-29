define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var CommentModel = require('models/CommentModel');
	var FullCommentView = require('views/FullCommentView');
	var LinkModel = require('models/LinkModel');
	var LinkView = require('views/LinkView');
	var ListingView = ok.CollectionView.extend({
		getConstructor: function (model) {
			if (model instanceof CommentModel) {
				return FullCommentView;
			}
			else if (model instanceof LinkModel) {
				return LinkView;
			}
			throw new Error('Unrecognised item in listing');
		}
	});
	return ListingView;
});