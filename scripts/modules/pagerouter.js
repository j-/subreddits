define(function (require) {
	var crossroads = require('crossroads');
	var qs = require('querystring');
	var ok = require('ok');
	var _ = require('underscore');
	var $ = require('jquery');
	var Controller = ok.Controller;
	// expression components
	var sort = '(new|rising|controversial|top|gilded|ads)';
	var optionalSort = '(?:\\/' + sort + ')?';
	var optionalQuery$ = '(?:\\?(.*?))?$';
	var optionalSlash = '\\/?';
	var oneOrMoreSubreddits = '(\\w+(?:\\+\\w+)*)';
	var optionalSlug = '(?:\\/\\w+)?';
	// convenience functions
	var re = function (str, flags) {
		// create regular expression
		return new RegExp(str, flags);
	};
	var sl = function (str) {
		// escape forward slashes
		return String(str).replace(/\//g, '\\/');
	};
	// matching expressions
	var expFrontPage = re('^$|^' + optionalSort + optionalSlash + optionalQuery$, 'i');
	var expSubreddit = re(sl('^/r/') + oneOrMoreSubreddits + optionalSort + optionalSlash + optionalQuery$, 'i');
	var expUserpage = re(sl('^/u(?:ser)?/(\\w+)') + optionalSlash + optionalQuery$, 'i');
	var expMulti = re(sl('^/u(?:ser)?/(\\w+)/m/(\\w+)') + optionalSlash + optionalQuery$, 'i');
	var expDomain = re(sl('^/domain?/(\\w+(?:\\.\\w+)+)') + optionalSlash + optionalSort + optionalQuery$, 'i');
	var expComments = re(sl('^/(?:r/' + oneOrMoreSubreddits + '/)?comments/(\\w+)') + optionalSlug + optionalSlash + optionalQuery$, 'i');
	var expSearch = re(sl('^/search') + optionalSlash + optionalQuery$, 'i');
	var expSubmit = re(sl('^/submit') + optionalSlash + optionalQuery$, 'i');
	var exp404 = re('^(.*)$');
	// controller definition
	var PageRouter = Controller.extend({
		init: function () {
			_.bindAll(this, 'parseCurrent', 'hitFrontPage', 'hitSubreddit', 'hitUserpage', 'hitDomain', 'hitSearch', 'hitSubmit', 'hitMulti', 'hitSubredditComments', 'hit404');
			crossroads.addRoute(expFrontPage, this.hitFrontPage);
			crossroads.addRoute(expSubreddit, this.hitSubreddit);
			crossroads.addRoute(expUserpage, this.hitUserpage);
			crossroads.addRoute(expMulti, this.hitMulti);
			crossroads.addRoute(expDomain, this.hitDomain);
			crossroads.addRoute(expComments, this.hitSubredditComments);
			crossroads.addRoute(expSearch, this.hitSearch);
			crossroads.addRoute(expSubmit, this.hitSubmit);
			crossroads.addRoute(exp404, this.hit404);
		},
		hitFrontPage: function (sort, query) {
			this.trigger('route:frontpage', sort, qs.parse(query));
		},
		hitSubreddit: function (subreddit, sort, query) {
			this.trigger('route:subreddit', subreddit, sort, qs.parse(query));
		},
		hitUserpage: function (username, query) {
			this.trigger('route:username', username, qs.parse(query));
		},
		hitMulti: function (username, multi, sort, query) {
			this.trigger('route:multi', username, multi, sort, qs.parse(query));
		},
		hitDomain: function (domain, sort, query) {
			this.trigger('route:domain', domain, sort, qs.parse(query));
		},
		hitSubredditComments: function (subreddit, id, query) {
			this.trigger('route:comments', id, qs.parse(query));
		},
		hitSearch: function (query) {
			this.trigger('route:search', qs.parse(query));
		},
		hitSubmit: function (query) {
			this.trigger('route:submit', qs.parse(query));
		},
		hit404: function (url) {
			console.warn('Could not match route', url);
			this.trigger('route:404', url);
		},
		go: function (path) {
			location.hash = path;
		},
		parseCurrent: function () {
			var hash = location.hash;
			var path = hash.substring(1);
			crossroads.parse(path);
		},
		start: function () {
			$(window).on('hashchange', this.parseCurrent);
		},
		stop: function () {
			Controller.prototype.stop.call(this);
			$(window).off('hashchange', this.parseCurrent);
		}
	});
	return new PageRouter();
});