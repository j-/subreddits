define(function (require, exports) {
	var $ = require('jquery');
	var _ = require('underscore');
	var Promise = require('bluebird');
	exports.getData = function (options) {
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
		// make call
		var xhr = $.ajax({
			url: page,
			dataType: 'jsonp',
			jsonp: 'jsonp',
			data: settings
		});
		return Promise.resolve(xhr).cancellable();
	};
});