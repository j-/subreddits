define(function (require, exports) {
	var $ = require('jquery');
	var _ = require('underscore');

	exports.getListing = function (options, callback) {
		var settings = _.extend({
			page: null,
			// after / before - only one should be specified. these indicate the
			// fullname of an item in the listing to use as the anchor point of
			// the slice.
			after: null,
			before: null,
			// limit - the maximum number of items to return in this slice of
			// the listing.
			limit: null,
			// count - the number of items already seen in this listing. on the
			// html site, the builder uses this to determine when to give values
			// for before and after in the response.
			count: null,
			// show - optional parameter; if all is passed, filters such as
			// "hide links that I have voted on" will be disabled.
			show: null
		}, options);
		// convert subreddit(s) into url
		var page = 'http://www.reddit.com' + (settings.page || '/') + '.json';
		delete settings.page;
		// make sure callback is a function
		callback = typeof callback === 'function' ? callback : _.identity;
		// make call
		$.ajax({
			url: page,
			dataType: 'json',
			jsonp: 'jsonp',
			data: settings,
			success: function (response) {
				callback(null, response);
			},
			error: function (xhr, status, message) {
				var err = new Error(message);
				err.name = status;
				callback(err);
			}
		});
	};

	exports.getRedditListing = function (options, callback) {
		var settings = _.extend({
			page: null,
			sort: null
		}, options);
		if (settings.page) {
			settings.page = '/r/' + settings.page;
		}
		if (settings.sort) {
			settings.page += '/' + settings.sort;
			delete settings.sort;
		}
		exports.getListing(settings, callback);
	};

	exports.getUserListing = function (options, callback) {
		var settings = _.extend({}, options);
		if (settings.page) {
			settings.page = '/u/' + settings.page;
		}
		exports.getListing(settings, callback);
	};

	exports.getSubredditAbout = function (options, callback) {
		var settings = _.extend({}, options);
		settings.page += '/about';
		exports.getRedditListing(settings, callback);
	};
});