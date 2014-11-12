define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var ListingView = require('views/ListingView');
	var EndOfListingView = require('views/EndOfListingView');
	var InfiniteScrollListingView = ok.$View.extend({
		scrollElement: window,
		scrollThreshold: 200,
		init: function (options) {
			// bind context
			_.bindAll(this, 'handleScroll');
			// load options
			_.extend(this, _.pick(options, 'controller', 'scrollElement', 'scrollThreshold', 'scrollCallback'));
			this.$scrollElement = $(this.scrollElement);
			// make listing
			this.listingView = new ListingView({
				className: 'listing-items',
				watch: this.watch
			});
			this.endOfListingView = new EndOfListingView({
				watch: this.controller.state.getProperty('atEnd')
			});
			this.canTrigger = true;
		},
		render: function () {
			this.empty();
			this.listingView.render();
			this.endOfListingView.render();
			this.$el
				.append(this.listingView.el)
				.append(this.endOfListingView.el);
		},
		handleScroll: function () {
			this.testScroll();
		},
		testScroll: function () {
			if (this.canTrigger && this.isCloseToBottom()) {
				this.canTrigger = false;
				var context = this;
				this.scrollCallback(function () {
					context.canTrigger = true;
					context.testScroll();
				});
			}
		},
		scrollCallback: function () {
			// no-op
			// virtual function
		},
		getScrollTop: function () {
			return this.$scrollElement.scrollTop();
		},
		getScrollHeight: function () {
			return document.body.scrollHeight;
		},
		getScrollBottom: function () {
			return this.getScrollTop() + this.scrollElement.innerHeight;
		},
		isCloseToBottom: function () {
			var height = this.getScrollHeight();
			var bottom = this.getScrollBottom();
			var threshold = this.scrollThreshold;
			return height - bottom < threshold;
		},
		expandAll: function () {
			this.listingView.expandAll();
		},
		collapseAll: function () {
			this.listingView.collapseAll();
		},
		start: function () {
			this.stop();
			this.listingView.start();
			this.endOfListingView.start();
			this.$scrollElement.on('scroll', this.handleScroll);
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.listingView.stop();
			this.endOfListingView.stop();
			this.$scrollElement.off('scroll', this.handleScroll);
		}
	});
	return InfiniteScrollListingView;
});