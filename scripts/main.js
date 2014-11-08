define(function (require) {
	require('ok.views');
	require('bootstrap');

	var _ = require('underscore');
	var subreddits = require('data/subreddits');

	var MultiredditCollection = require('collections/MultiredditCollection');
	var SubredditSelector = require('views/SubredditSelector');
	var StorageController = require('controllers/StorageController');

	var all = new MultiredditCollection();
	var sidebar = new SubredditSelector({
		id: 'subreddit-selector',
		watch: all
	});
	sidebar.render();
	sidebar.start();

	var data = all.get();
	all.set(data);

	var storage = new StorageController({
		watch: all,
		storageKey: 'subscriptions'
	});

	storage.load();

	$(window).on('beforeunload', function () {
		storage.save();
	});

	window.init = function () {
		all.set(subreddits);
	};
	// automatically init on first-ish visit
	if (!all.items.length) {
		init();
	}

	var Listing = require('collections/Listing');
	var ListingController = require('controllers/ListingController');
	var pagerouter = require('modules/pagerouter');
	pagerouter.start();

	var listing = new Listing();
	var controller = new ListingController({
		listing: listing,
		router: pagerouter
	});

	var MainView = require('views/MainView');
	var mainView = new MainView({
		listing: listing,
		router: pagerouter,
		controller: controller
	});

	mainView.render();
	mainView.start();

	var HeaderView = require('views/HeaderView');
	var header = new HeaderView();
	header.render();
	header.start();
	header.on('refresh', function () {
		controller.reload();
	});

	$(function () {
		$(document.body)
			.append(header.el)
			.append(mainView.el)
			.append(sidebar.el);
	});

	pagerouter.parseCurrent();
});