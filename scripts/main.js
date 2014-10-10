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