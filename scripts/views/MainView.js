define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var InfiniteScrollListingView = require('views/InfiniteScrollListingView');
	var MainView = ok.$View.extend({
		className: 'main-view',
		init: function (options) {
			_.extend(this, _.pick(options, 'router', 'controller', 'listing'));
			_.bindAll(this, 'scrollCallback');
			this.listingView = new InfiniteScrollListingView({
				id: 'listing',
				watch: this.listing,
				controller: this.controller,
				scrollThreshold: 1200,
				scrollCallback: this.scrollCallback
			});
		},
		render: function () {
			this.empty();
			this.listingView.render();
			this.$el.append(this.listingView.$el);
		},
		scrollCallback: function (done) {
			if (!this.controller.end) {
				this.controller.loadMore({
					limit: 5
				}, done);
			}
			else {
				// todo: once
				this.controller.on('listing', done);
			}
		},
		start: function () {
			ok.$View.prototype.start.call(this);
			this.listingView.start();
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.listingView.stop();
		}
	});
	return MainView;
});