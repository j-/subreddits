define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var ListingView = require('views/ListingView');
	var InfiniteScrollListingView = ok.$View.extend({
		scrollElement: window,
		scrollThreshold: 200,
		init: function (options) {
			// bind context
			_.bindAll(this, 'handleScroll');
			// load options
			_.extend(this, _.pick(options, 'scrollElement', 'scrollThreshold', 'scrollCallback'));
			this.$scrollElement = $(this.scrollElement);
			// make listing
			this.listingView = new ListingView({
				watch: this.watch
			});
			this.canTrigger = true;
			this.testScroll();
		},
		render: function () {
			this.empty();
			this.listingView.render();
			this.$el.append(this.listingView.el);
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
		start: function () {
			this.listingView.start();
			this.$scrollElement.on('scroll', this.handleScroll);
		},
		stop: function fn () {
			fn.old.call(this);
			this.listingView.stop();
			this.$scrollElement.off('scroll', this.handleScroll);
		}
	});
	return InfiniteScrollListingView;
});