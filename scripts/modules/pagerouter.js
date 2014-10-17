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
				'hitDomain', 'hitComments', 'hitSearch', 'hitSubmit');
			crossroads.addRoute('/', this.hitFrontPage);
			crossroads.addRoute('/r/{subreddit}', this.hitSubreddit);
			crossroads.addRoute('/u/{username}', this.hitUserpage);
			crossroads.addRoute('/user/{username}', this.hitUserpage);
			crossroads.addRoute('/domain/{domain}', this.hitDomain);
			crossroads.addRoute('/comments/{id}', this.hitComments);
			crossroads.addRoute('/search:?query:', this.hitSearch);
			crossroads.addRoute('/submit:?query:', this.hitSubmit);
		},
		hitFrontPage: function () {
			this.trigger('route:frontpage');
		},
		hitSubreddit: function (subreddit) {
			this.trigger('route:subreddit', subreddit);
		},
		hitUserpage: function (username) {
			this.trigger('route:username', username);
		},
		hitDomain: function (domain) {
			this.trigger('route:domain', domain);
		},
		hitComments: function (id) {
			this.trigger('route:comments', id);
		},
		hitSearch: function (query) {
			this.trigger('route:search', query);
		},
		hitSubmit: function () {
			this.trigger('route:submit');
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