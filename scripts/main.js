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
	var CommentsModel = require('models/CommentsModel');
	var ListingController = require('controllers/ListingController');
	var CommentsController = require('controllers/CommentsController');
	var pagerouter = require('modules/pagerouter');
	pagerouter.start();

	var listing = new Listing();
	var listingController = new ListingController({
		listing: listing,
		router: pagerouter
	});

	var comments = new CommentsModel();
	var commentsController = new CommentsController({
		comments: comments,
		router: pagerouter
	});

	var MainView = require('views/MainView');
	var mainView = new MainView({
		router: pagerouter,
		listing: listing,
		listingController: listingController,
		comments: comments,
		commentsController: commentsController
	});

	mainView.render();
	mainView.start();

	var HeaderView = require('views/HeaderView');
	var header = new HeaderView();
	header.render();
	header.start();
	header.on('refresh', function () {
		listingController.reload();
	});
	header.on('expandall', function () {
		mainView.expandAll();
	});
	header.on('collapseall', function () {
		mainView.collapseAll();
	});
	header.on('search', function (query) {
		listingController.search(query);
	});

	$(function () {
		$(document.body)
			.append(header.el)
			.append(mainView.el)
			.append(sidebar.el);
	});

	pagerouter.parseCurrent();
});