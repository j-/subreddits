define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var EmbeddedContentView = EmbeddedView.extend({
		className: 'embedded-content embedded-content',
		render: function () {
			var html = this.watch.get('media_embed').content;
			html = _.unescape(html);
			this.empty();
			this.$el.html(html);
		}
	});
	EmbeddedContentView.identify = function (linkModel) {
		var mediaEmbed = linkModel.get('media_embed');
		return mediaEmbed && typeof mediaEmbed.content === 'string';
	};
	return EmbeddedContentView;
});