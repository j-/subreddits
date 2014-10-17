define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var pagerouter = require('modules/pagerouter');
	return ok.$View.extend({
		tagName: 'a',
		className: 'inline-subreddit',
		init: function () {
			_.bindAll(this, 'handleClick');
		},
		render: function () {
			var displayName = this.watch.get('display_name');
			this.$el
				.empty()
				.attr('href', 'http://www.reddit.com/r/' + displayName);
			$.textNode('/r/')
				.appendTo(this.$el);
			$.create('span')
				.addClass('name')
				.text(displayName)
				.appendTo(this.$el);
		},
		handleClick: function (e) {
			e.preventDefault();
			var displayName = this.watch.get('display_name');
			pagerouter.go('/r/' + displayName);
		},
		start: function () {
			this.$el.on('click', this.handleClick);
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('click', this.handleClick);
		}
	});
});