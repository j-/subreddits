define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var InfiniteScrollListingView = require('views/InfiniteScrollListingView');
	var CommentsView = require('views/CommentsView');
	var MainView = ok.$View.extend({
		className: 'main-view',
		init: function (options) {
			_.extend(this, _.pick(options, 'router', 'controller', 'listing'));
			_.bindAll(this, 'scrollCallback', 'handleRouteListing', 'handleRouteComments');
			this.listingView = this.addChildView(InfiniteScrollListingView, {
				id: 'listing',
				watch: this.listing,
				controller: this.controller,
				scrollThreshold: 1200,
				scrollCallback: this.scrollCallback
			});
			this.commentsView = this.addChildView(CommentsView, {
				id: 'comments',
				controller: this.controller
			});
			this.routeState = new ok.Property();
			this.listenTo(this.routeState, 'change', this.renderCurrentRoute);
			this.router.on('route:subreddit', this.handleRouteListing);
			this.router.on('route:frontpage', this.handleRouteListing);
			this.router.on('route:username', this.handleRouteListing);
			this.router.on('route:multi', this.handleRouteListing);
			this.router.on('route:domain', this.handleRouteListing);
			this.router.on('route:search', this.handleRouteListing);
			this.router.on('route:comments', this.handleRouteComments);
		},
		render: function () {
			this.empty();
			this.renderChildViews();
			this.renderCurrentRoute();
		},
		renderCurrentRoute: function () {
			switch (this.routeState.get()) {
				case 'listing':
					this.showListing();
					break;
				case 'comments':
					this.showComments();
					break;
			}
		},
		handleRouteListing: function () {
			this.routeState.set('listing');
		},
		handleRouteComments: function () {
			this.routeState.set('comments');
		},
		showListing: function () {
			this.empty();
			this.$el.append(this.listingView.$el);
		},
		showComments: function () {
			this.empty();
			this.$el.append(this.commentsView.$el);
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
		}
	});
	return MainView;
});