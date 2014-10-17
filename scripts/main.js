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

	var sync = window.sync = require('modules/sync');

	var Listing = require('collections/Listing');
	var frontpage = new Listing();

	var currentPage = '/';
	var after = null;
	var settings = null;
	var fetchMore = function (done) {
		var options = _.extend({
			page: currentPage,
			after: after,
			limit: 5
		}, settings);
		sync.getRedditListing(options, function (err, response) {
			if (!err) {
				after = response.data.after;
				frontpage.add(response.data.children);
			}
			if (typeof done === 'function') {
				done(err);
			}
		});
	};

	var ListingView = require('views/InfiniteScrollListingView');
	var listingview = new ListingView({
		id: 'listing',
		watch: frontpage,
		scrollThreshold: 1200,
		scrollCallback: function (done) {
			fetchMore(function (err) {
				done();
			});
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

	$(function () {
		$(document.body).append(header.el);
	});

	var pagerouter = require('modules/pagerouter');
	pagerouter.start();
	pagerouter.on('route:subreddit', function (subreddit) {
		settings = null;
		$(document.body).scrollTop(0);
		frontpage.empty();
		currentPage = subreddit;
		after = null;
		fetchMore(function () {
			listingview.testScroll();
		});
	});
	pagerouter.on('route:frontpage', function () {
		settings = null;
		$(document.body).scrollTop(0);
		frontpage.empty();
		currentPage = null;
		after = null;
		fetchMore(function () {
			listingview.testScroll();
		});
	});
	header.on('sort', function (sort, t) {
		settings = {
			sort: sort,
			t: t
		};
		$(document.body).scrollTop(0);
		frontpage.empty();
		after = null;
		fetchMore(function () {
			listingview.testScroll();
		});
	});
	pagerouter.parseCurrent();
});