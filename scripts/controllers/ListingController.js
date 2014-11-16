define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');
	var Promise = require('bluebird');
	var sync = require('modules/sync');
	var Listing = require('collections/Listing');
	var ListingController = ok.Controller.extend({
		init: function (options) {
			_.extend(this, _.pick(options, 'listing', 'router'));
			_.bindAll(this, 'resetState', 'loadMore', 'handleResponse', 'handleRouteSubreddit', 'handleRouteFrontpage', 'handleRouteUsername', 'handleRouteDomain', 'handleRouteMulti', 'handleRouteSearch');
			this.params = new ok.Map({
				after: null
			});
			this.state = new ok.Map({
				atEnd: false,
				currentPage: null
			});
			this.latestXhr = null;
			this.router.on('route:subreddit', this.handleRouteSubreddit);
			this.router.on('route:frontpage', this.handleRouteFrontpage);
			this.router.on('route:username', this.handleRouteUsername);
			this.router.on('route:multi', this.handleRouteMulti);
			this.router.on('route:domain', this.handleRouteDomain);
			this.router.on('route:search', this.handleRouteSearch);
		},
		resetState: function () {
			this.listing.empty();
			this.resetParams();
			this.state.set('atEnd', false);
			this.state.set('currentPage', null);
			if (this.latestXhr) {
				this.latestXhr.abort();
				this.latestXhr = null;
			}
		},
		resetParams: function () {
			_.forEach(this.params.properties, function (prop) {
				prop.set(null);
			});
		},
		setParams: function (params) {
			this.params.set(params);
		},
		loadMore: function (options) {
			// use current state as defaults
			options = _.extend({
				page: this.state.get('currentPage')
			}, this.params.get(), options);
			// no point fetching if the last result set was empty
			if (this.state.get('atEnd')) {
				return Promise.reject(new Error('At end of listing'));
			}
			// kill an existing request
			if (this.latestXhr) {
				this.latestXhr.abort();
			}
			this.latestXhr = sync.getData(options);
			Promise.resolve(this.latestXhr)
				.bind(this)
				.catch(this.handleError)
				.then(this.handleResponse);
			return Promise.resolve(this.latestXhr);
		},
		reload: function () {
			this.listing.empty();
			this.params.set('after', null);
			this.loadMore();
		},
		search: function (query) {
			this.resetState();
			this.setParams({
				q: query
			});
			this.state.set('currentPage', '/search');
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
			this.params.set('after', after);
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
			this.setParams(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteSubreddit: function (subreddit, sort, query) {
			var page = '/r/' + subreddit;
			if (sort) {
				page += '/' + sort;
			}
			this.resetState();
			this.setParams(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteUsername: function (username, query) {
			var page = '/user/' + username;
			this.resetState();
			this.setParams(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteMulti: function (username, multi, sort, query) {
			var page = '/user/' + username + '/m/' + multi;
			if (sort) {
				page += '/' + sort;
			}
			this.resetState();
			this.setParams(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteDomain: function (domain, sort, query) {
			var page = '/domain/' + domain;
			if (sort) {
				page += '/' + sort;
			}
			this.resetState();
			this.setParams(query);
			this.state.set('currentPage', page);
			this.loadMore();
		},
		handleRouteSearch: function (query) {
			this.resetState();
			this.setParams(query);
			this.state.set('currentPage', '/search');
			this.loadMore();
		}
	});
	return ListingController;
});