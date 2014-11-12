define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var $ = require('jquery');
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
		},
		getItemView: function () {
			var view = ok.CollectionView.prototype.getItemView.apply(this, arguments);
			$(view.el).addClass('listing-item');
			return view;
		},
		expandAll: function () {
			_.each(this.children, function (child) {
				child.view.showEmbedded();
			});
		},
		collapseAll: function () {
			_.each(this.children, function (child) {
				child.view.hideEmbedded();
			});
		}
	});
	return ListingView;
});