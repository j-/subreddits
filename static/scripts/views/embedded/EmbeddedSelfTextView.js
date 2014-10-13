define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var EmbeddedSelfTextView = EmbeddedView.extend({
		render: function () {
			var html = this.watch.get('selftext_html');
			html = _.unescape(html);
			this.$el
				.empty()
				.addClass('selftext')
				.html(html);
		}
	});
	EmbeddedSelfTextView.identify = function (linkModel) {
		var selftext = linkModel.get('selftext_html');
		return Boolean(selftext);
	};
	return EmbeddedSelfTextView;
});