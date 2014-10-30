define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var UserContentView = require('views/UserContentView');
	var EmbeddedSelfTextView = EmbeddedView.extend({
		className: 'embedded-content embedded-selftext',
		init: function () {
			this.userContentView = new UserContentView({
				watch: this.watch.getProperty('selftext_html')
			});
		},
		render: function () {
			this.empty();
			this.userContentView.render();
			this.$el.append(this.userContentView.$el);
		},
		start: function () {
			EmbeddedView.prototype.start.call(this);
			this.userContentView.start();
		},
		stop: function () {
			EmbeddedView.prototype.stop.call(this);
			this.userContentView.stop();
		}
	});
	EmbeddedSelfTextView.identify = function (linkModel) {
		var selftext = linkModel.get('selftext_html');
		return Boolean(selftext);
	};
	return EmbeddedSelfTextView;
});