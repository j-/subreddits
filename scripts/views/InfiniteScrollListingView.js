define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var ListingView = require('views/ListingView');
	var EndOfListingView = require('views/EndOfListingView');
	var InfiniteScrollController = require('controllers/InfiniteScrollController');
	var InfiniteScrollListingView = ok.$View.extend({
		init: function (options) {
			// load options
			_.extend(this, _.pick(options, 'controller'));
			// make listing
			this.listingView = this.addChildView(ListingView, {
				className: 'listing-items',
				watch: this.watch
			});
			this.endOfListingView = this.addChildView(EndOfListingView, {
				watch: this.controller.state.getProperty('atEnd')
			});
			this.scrollController = new InfiniteScrollController();
			this.listenTo(this.scrollController, 'bottom', this.handleBottom);
		},
		render: function () {
			this.empty();
			this.renderChildViews();
			this.$el
				.append(this.listingView.el)
				.append(this.endOfListingView.el);
		},
		expandAll: function () {
			this.listingView.expandAll();
		},
		collapseAll: function () {
			this.listingView.collapseAll();
		},
		handleBottom: function () {
			this.trigger('bottom');
		},
		resume: function () {
			this.scrollController.resume();
		},
		start: function () {
			ok.$View.prototype.start.call(this);
			this.scrollController.start();
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.scrollController.stop();
		}
	});
	return InfiniteScrollListingView;
});