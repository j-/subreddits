define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	return ok.$View.extend({
		tagName: 'a',
		className: 'inline-subreddit',
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
		}
	});
});