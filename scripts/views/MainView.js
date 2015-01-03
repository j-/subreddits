define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var InfiniteScrollListingView = require('views/InfiniteScrollListingView');
	var CommentsView = require('views/CommentsView');
	var MainView = ok.$View.extend({
		className: 'main-view',
		init: function (options) {
			_.extend(this, _.pick(options, 'router', 'listing', 'listingController', 'comments', 'commentsController'));
			_.bindAll(this, 'handleRouteListing', 'handleRouteComments');
			this.listingView = this.addChildView(InfiniteScrollListingView, {
				id: 'listing',
				watch: this.listing,
				controller: this.listingController,
				scrollThreshold: 1200,
				resumeDelay: 100
			});
			this.commentsView = this.addChildView(CommentsView, {
				id: 'comments',
				watch: this.comments,
				controller: this.commentsController
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
			this.listenTo(this.listingView, 'bottom', this.handleBottom);
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
		handleBottom: function () {
			var options = {
				limit: 15
			};
			var context = this;
			this.listingController
				.loadMore(options)
				.then(function () {
					context.listingView.resume();
				});
		},
		expandAll: function () {
			this.listingView.expandAll();
		},
		collapseAll: function () {
			this.listingView.collapseAll();
		}
	});
	return MainView;
});