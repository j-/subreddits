define(function (require) {
	var crossroads = require('crossroads');
	var qs = require('querystring');
	var ok = require('ok');
	var _ = require('underscore');
	var $ = require('jquery');
	var Controller = ok.Controller;
	var PageRouter = Controller.extend({
		init: function () {
			_.bindAll(this, 'parseCurrent', 'hitFrontPage', 'hitSubreddit', 'hitUserpage', 'hitDomain', 'hitSearch', 'hitSubmit', 'hitMulti', 'hitSubredditComments');
			crossroads.addRoute(/^$|^\/(?:(new|rising|controversial|top|gilded|ads)\/?)?(?:\?(.*?))?$/i, this.hitFrontPage);
			crossroads.addRoute(/^\/r\/(\w+)(?:\/(\w+))?\/?(?:\?(.*?))?$/i, this.hitSubreddit);
			crossroads.addRoute(/^\/u(?:ser)?\/(\w+)\/?(?:\?(.*?))?$/i, this.hitUserpage);
			crossroads.addRoute(/^\/u(?:ser)?\/(\w+)\/m\/(\w+)(?:\/(\w+))?\/?(?:\?(.*?))?$/i, this.hitMulti);
			crossroads.addRoute(/^\/domain\/(.*?)\/?(?:\?(.*?))?$/i, this.hitDomain);
			crossroads.addRoute(/^\/(?:r\/(\w+)\/)?comments\/?(\w+)\/?(?:\?(.*?))?$/i, this.hitSubredditComments);
			crossroads.addRoute(/^\/search\/?(?:\?(.*?))?$/i, this.hitSearch);
			crossroads.addRoute(/^\/submit\/?(?:\?(.*?))?$/i, this.hitSubmit);
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