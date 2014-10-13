define(function (require) {
	require('ok.views');
	require('bootstrap');

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

	var sync = window.sync = require('modules/sync');

	var Listing = require('collections/Listing');
	var frontpage = new Listing();
	sync.getListing({ page: '/', limit: 100 }, function (err, response) {
		frontpage.set(response.data.children);
		console.log(frontpage.get());
	});

	var ListingView = require('views/ListingView');
	var listingview = new ListingView({
		id: 'listing',
		watch: frontpage
	});

	listingview.render();
	listingview.start();

	$(function () {
		$(document.body).append(listingview.el);
	});

	var HeaderView = require('views/HeaderView');
	var header = new HeaderView();
	header.render();
	header.start();

	header.on('sort', function (sort, t) {
		var options = {
			page: null,
			sort: sort,
			t: t
		};
		sync.getRedditListing(options, function (err, response) {
			frontpage.set(response.data.children);
			console.log(frontpage.get());
		});
	});

	$(function () {
		$(document.body).append(header.el);
	});
});