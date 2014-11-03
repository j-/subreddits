define(function (require) {
	var crossroads = require('crossroads');
	var ok = require('ok');
	var _ = require('underscore');
	var $ = require('jquery');
	var Controller = ok.Controller;
	var PageRouter = Controller.extend({
		init: function () {
			_.bindAll(this,
				'parseCurrent', 'hitFrontPage', 'hitSubreddit', 'hitUserpage',
				'hitDomain', 'hitComments', 'hitSearch', 'hitSubmit',
				'hitMulti');
			crossroads.addRoute('/:sort:/:?query:', this.hitFrontPage);
			crossroads.addRoute('/r/{subreddit}/:sort:/:?query:', this.hitSubreddit);
			crossroads.addRoute('/u/{username}/:sort:/:?query:', this.hitUserpage);
			crossroads.addRoute('/user/{username}/:sort:/:?query:', this.hitUserpage);
			crossroads.addRoute('/u/{username}/m/{multi}/:sort:/:?query:', this.hitMulti);
			crossroads.addRoute('/user/{username}/m/{multi}/:sort:/:?query:', this.hitMulti);
			crossroads.addRoute('/domain/{domain}/:sort:/:?query:', this.hitDomain);
			crossroads.addRoute('/comments/{id}:?query:', this.hitComments);
			crossroads.addRoute('/search:?query:', this.hitSearch);
			crossroads.addRoute('/submit:?query:', this.hitSubmit);
		},
		hitFrontPage: function (sort, query) {
			this.trigger('route:frontpage', sort, query);
		},
		hitSubreddit: function (subreddit, sort, query) {
			this.trigger('route:subreddit', subreddit, sort, query);
		},
		hitUserpage: function (username, sort, query) {
			this.trigger('route:username', username, sort, query);
		},
		hitMulti: function (username, multi, sort, query) {
			this.trigger('route:multi', username, multi, sort, query);
		},
		hitDomain: function (domain, sort, query) {
			this.trigger('route:domain', domain, sort, query);
		},
		hitComments: function (id, query) {
			this.trigger('route:comments', id, query);
		},
		hitSearch: function (query) {
			this.trigger('route:search', query);
		},
		hitSubmit: function (query) {
			this.trigger('route:submit', query);
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