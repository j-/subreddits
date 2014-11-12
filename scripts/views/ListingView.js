define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var $ = require('jquery');
	var CommentModel = require('models/CommentModel');
	var FullCommentView = require('views/FullCommentView');
	var LinkModel = require('models/LinkModel');
	var LinkView = require('views/LinkView');
	var ListingView = ok.CollectionView.extend({
		init: function () {
			this.expanded = false;
		},
		getConstructor: function (model) {
			if (model instanceof CommentModel) {
				return FullCommentView;
			}
			else if (model instanceof LinkModel) {
				return LinkView;
			}
			throw new Error('Unrecognised item in listing');
		},
		addChildView: function (view) {
			ok.CollectionView.prototype.addChildView.apply(this, arguments);
			$(view.el).addClass('listing-item');
			if (this.expanded) {
				view.showEmbedded();
			}
		},
		expandAll: function () {
			this.expanded = true;
			_.each(this.children, function (child) {
				child.view.showEmbedded();
			});
		},
		collapseAll: function () {
			this.expanded = false;
			_.each(this.children, function (child) {
				child.view.hideEmbedded();
			});
		}
	});
	return ListingView;
});