define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');
	var sync = require('modules/sync');
	var Listing = require('collections/Listing');
	var ListingController = ok.Controller.extend({
		init: function (options) {
			_.extend(this, _.pick(options, 'listing', 'router'));
			_.bindAll(this, 'resetState', 'loadMore', 'handleResponse', 'handleRouteSubreddit', 'handleRouteFrontpage', 'handleRouteUsername', 'handleRouteDomain');
			this.state = new ok.Map({
				after: null,
				atEnd: false,
				currentPage: null
			});
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
		resetState: function () {
			this.listing.empty();
			this.state.set('after', null);
			this.state.set('atEnd', false);
			this.state.set('currentPage', null);
			if (this.latestXhr) {
				this.latestXhr.abort();
				this.latestXhr = null;
			}
		},
		loadMore: function (options, callback) {
			options = _.extend({
				after: this.state.get('after'),
				page: this.state.get('currentPage')
			}, options);
			callback = typeof callback === 'function' ? callback : _.identity;
			if (this.state.get('atEnd')) {
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
			var after = response.data.after;
			this.state.set('after', after);
			if (!after) {
				this.state.set('atEnd', true);
				this.handleEnd();
			}
			this.listing.add(response.data.children);
			this.trigger('listing');
		},
		handleRouteFrontpage: function () {
			this.resetState();
			this.state.set('currentPage', '/');
			this.loadMore();
		},
		handleRouteSubreddit: function (subreddit) {
			this.resetState();
			this.state.set('currentPage', '/r/' + subreddit);
			this.loadMore();
		},
		handleRouteUsername: function (username) {
			this.resetState();
			this.state.set('currentPage', '/user/' + username);
			this.loadMore();
		},
		handleRouteDomain: function (domain) {
			this.resetState();
			this.state.set('currentPage', '/domain/' + domain);
			this.loadMore();
		}
	});
	return ListingController;
});