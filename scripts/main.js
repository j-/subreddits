define(function (require) {
	require('ok.views');
	require('bootstrap');

	var _ = require('underscore');
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
	// automatically init on first-ish visit
	if (!all.items.length) {
		init();
	}

	var Listing = require('collections/Listing');
	var ListingController = require('controllers/ListingController');
	var pagerouter = require('modules/pagerouter');

	var listing = new Listing();
	var controller = new ListingController({
		listing: listing,
		router: pagerouter
	});

	var ListingView = require('views/InfiniteScrollListingView');
	var listingview = new ListingView({
		id: 'listing',
		watch: listing,
		controller: controller,
		scrollThreshold: 1200,
		scrollCallback: function (done) {
			if (!controller.end) {
				controller.loadMore({
					limit: 5
				}, done);
			}
			else {
				controller.on('listing', done);
			}
		}
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
	header.on('refresh', function () {
		controller.reload();
	});

	$(function () {
		$(document.body).append(header.el);
	});
});