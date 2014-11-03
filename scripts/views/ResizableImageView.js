define(function (require) {
	var ResizableView = require('views/ResizableView');
	var ResizableImageView = ResizableView.extend({
		tagName: 'a',
		init: function (options) {
			this.$img = $();
			this.url = options.url;
			this.href = options.href || this.url;
		},
		render: function () {
			this.empty();
			this.$img = $.create('img')
				.addClass('drag-image')
				.attr('src', this.url);
			this.$el
				.attr('href', this.href)
				.attr('target', '_blank')
				.append(this.$img);
		},
		setImageURL: function (url) {
			this.url = url;
			this.$img.attr('src', this.url);
		},
		setAnchorHref: function (href) {
			this.href = href;
			this.$el.attr('href', this.href);
		}
	});
	return ResizableImageView;
});