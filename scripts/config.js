requirejs.config({
	paths: {
		'jquery': '//code.jquery.com/jquery-1.11.1.min',
		'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
		'ok': '//cdn.rawgit.com/j-/ok/0.1.0/ok',
		'ok.views': '//cdn.rawgit.com/j-/ok/0.1.0/ok.views'
	},
	shim: {
		'ok': {
			deps: ['underscore'],
			exports: 'okaylib'
		},
		'ok.views': {
			deps: ['ok'],
			exports: 'okaylib'
		}
	}
});

define(function (require) {
	require('ok.views');

	var subreddits = require('data/subreddits');

	var MultiredditCollection = require('collections/MultiredditCollection');
	var SubredditSelector = require('views/SubredditSelector');
	var StorageController = require('controllers/StorageController');

	var all = new MultiredditCollection();
	var view = new SubredditSelector({
		id: 'subreddit-selector',
		watch: all
	});
	view.render();
	view.start();

	var data = all.get();
	all.set(data);

	var storage = new StorageController({
		watch: all,
		storageKey: 'subscriptions'
	});

	storage.load();

	$(function () {
		$(document.body).append(view.el);
	});

	$(window).on('beforeunload', function () {
		storage.save();
	});

	window.init = function () {
		all.set(subreddits);
	};
});