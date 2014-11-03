define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');
	var sync = require('modules/sync');
	var Listing = require('collections/Listing');
	var ListingController = ok.Controller.extend({
		init: function (options) {
			_.extend(this, _.pick(options, 'listing', 'router'));
			_.bindAll(this, 'resetState', 'loadMore', 'handleResponse', 'handleRouteSubreddit', 'handleRouteFrontpage', 'handleRouteUsername', 'handleRouteDomain', 'handleRouteMulti', 'handleRouteSearch');
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
			this.router.on('route:multi', this.handleRouteMulti);
			this.router.on('route:domain', this.handleRouteDomain);
			this.router.on('route:search', this.handleRouteSearch);
			this.router.parseCurrent();
		},
		resetState: function () {
			this.listing.empty();
			this.setQuery(null);
			this.state.set('after', null);
			this.state.set('atEnd', false);
			this.state.set('currentPage', null);
			if (this.latestXhr) {
				this.latestXhr.cancel();
				this.latestXhr = null;
			}
		},
		setQuery: function (query) {
			query = _.extend({}, query);
			this.state.set({
				after: query.after || null,
				q: query.q || null,
				sort: query.sort || null,
				t: query.t || null
			});
		},
		loadMore: function (options, callback) {
			// use current state as defaults
			options = _.extend({
				after: this.state.get('after'),
				page: this.state.get('currentPage'),
				q: this.state.get('q'),
				sort: this.state.get('sort'),
				t: this.state.get('t')
			}, options);
			// ensure callback is a function even if only a no-op
			callback = typeof callback === 'function' ? callback : _.identity;
			// no point fetching if the last result set was empty
			if (this.state.get('atEnd')) {
				callback(new Error('End of listing'));
			}
			// kill an existing request
			if (this.latestXhr) {
				this.latestXhr.cancel();
			}
			this.latestXhr = sync.getListing(options)
				.bind(this)
				.catch(this.handleError)
				.then(this.handleResponse);
			this.latestXhr.then(function () {
				callback(null);
			});
		},
		reload: function () {
			this.listing.empty();
			this.state.set('after', null);
			this.loadMore();
		},
		handleError: function (err) {
			console.log('Error fetching listing', err);
		},
		handleEnd: function () {
			console.log('End of listing reached');
		},
		handleResponse: function (response) {
			var after = response.data.after;
			this.state.set('after', after);
			if (!after) {
				this.state.set('atEnd', true);
				this.handleEnd();
			}
			this.listing.add(response.data.children);
			this.trigger('listing');
		},
		handleRouteFrontpage: function (sort, query) {
			var page = '/';
			if (sort) {
				page += sort;
			}
			this.resetState();
			this.setQuery(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteSubreddit: function (subreddit, sort, query) {
			var page = '/r/' + subreddit;
			if (sort) {
				page += '/' + sort;
			}
			this.resetState();
			this.setQuery(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteUsername: function (username, sort, query) {
			var page = '/user/' + username;
			if (sort) {
				page += '/' + sort;
			}
			this.resetState();
			this.setQuery(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteMulti: function (username, multi, sort, query) {
			var page = '/user/' + username + '/m/' + multi;
			if (sort) {
				page += '/' + sort;
			}
			this.resetState();
			this.setQuery(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteDomain: function (domain, sort, query) {
			var page = '/domain/' + domain;
			if (sort) {
				page += '/' + sort;
			}
			this.resetState();
			this.setQuery(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteSearch: function (query) {
			this.resetState();
			this.setQuery(query);
			this.state.set('currentPage', '/search');
			this.loadMore();
		}
	});
	return ListingController;
});