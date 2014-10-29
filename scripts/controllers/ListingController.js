define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');
	var sync = require('modules/sync');
	var Listing = require('collections/Listing');
	var ListingController = ok.Controller.extend({
		init: function (options) {
			_.extend(this, _.pick(options, 'listing', 'router'));
			_.bindAll(this, 'resetState', 'loadMore', 'handleResponse', 'handleRouteSubreddit', 'handleRouteFrontpage', 'handleRouteUsername', 'handleRouteDomain');
			this.after = null;
			this._currentPage = null;
			this.latestXhr = null;
			this.initRouter();
		},
		initRouter: function () {
			this.router.start();
			this.router.on('route:subreddit', this.handleRouteSubreddit);
			this.router.on('route:frontpage', this.handleRouteFrontpage);
			this.router.on('route:username', this.handleRouteUsername);
			this.router.on('route:domain', this.handleRouteDomain);
			this.router.parseCurrent();
		},
		setCurrentPage: function (currentPage) {
			this._currentPage = currentPage;
		},
		getCurrentPage: function () {
			return this._currentPage;
		},
		clearCurrentPage: function () {
			this._currentPage = null;
		},
		resetState: function () {
			this.listing.empty();
			this.after = null;
			this.end = false;
			this.clearCurrentPage();
			if (this.latestXhr) {
				this.latestXhr.abort();
				this.latestXhr = null;
			}
		},
		loadMore: function (options, callback) {
			options = _.extend({
				after: this.after,
				page: this.getCurrentPage()
			}, options);
			callback = typeof callback === 'function' ? callback : _.identity;
			if (this.end) {
				callback(new Error('End of listing'));
			}
			if (this.latestXhr) {
				this.latestXhr.abort();
			}
			this.latestXhr = sync.getListing(options, this.handleResponse);
			this.latestXhr.then(function () {
				callback(null);
			});
		},
		handleError: function (err) {
			console.log('Error fetching listing', err);
		},
		handleEnd: function () {
			console.log('End of listing reached');
		},
		handleResponse: function (err, response) {
			if (err) {
				this.handleError(err);
				return;
			}
			this.after = response.data.after;
			if (!this.after) {
				this.end = true;
				this.handleEnd();
			}
			this.listing.add(response.data.children);
			this.trigger('listing');
		},
		handleRouteFrontpage: function () {
			this.resetState();
			this.setCurrentPage('/');
			this.loadMore();
		},
		handleRouteSubreddit: function (subreddit) {
			this.resetState();
			this.setCurrentPage('/r/' + subreddit);
			this.loadMore();
		},
		handleRouteUsername: function (username) {
			this.resetState();
			this.setCurrentPage('/user/' + username);
			this.loadMore();
		},
		handleRouteDomain: function (domain) {
			this.resetState();
			this.setCurrentPage('/domain/' + domain);
			this.loadMore();
		}
	});
	return ListingController;
});