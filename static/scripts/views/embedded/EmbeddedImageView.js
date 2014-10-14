define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var ResizableImageView = require('views/ResizableImageView');
	var EmbeddedImageView = EmbeddedView.extend({
		className: 'embedded-content embedded-image',
		init: function fn () {
			fn.old.apply(this, arguments);
			this.href = this.watch.get('url');
			this.url = EmbeddedImageView.getImageURL(this.href);
			this.imageView = new ResizableImageView({
				url: this.url,
				href: this.href
			});
		},
		render: function () {
			this.empty();
			this.imageView.render();
			this.$el.append(this.imageView.el);
		},
		start: function fn () {
			fn.old.call(this);
			this.imageView.start();
		},
		stop: function fn () {
			fn.old.call(this);
			this.imageView.stop();
		}
	});
	EmbeddedImageView.extensionExp = /\.(jpe?g|gif|png)$/i;
	EmbeddedImageView.imgurExp = /imgur.com\/(?!a\/)(?:gallery\/)?([a-z0-9]*)/i;
	EmbeddedImageView.getImageURL = function (url) {
		if (EmbeddedImageView.extensionExp.test(url)) {
			return url;
		}
		var imgurMatch = url.match(EmbeddedImageView.imgurExp);
		if (imgurMatch) {
			return 'http://i.imgur.com/' + imgurMatch[1] + '.gif';
		}
		return null;
	};
	EmbeddedImageView.identify = function (linkModel) {
		var linkUrl = linkModel.get('url');
		var imageUrl = EmbeddedImageView.getImageURL(linkUrl);
		return Boolean(imageUrl);
	};
	return EmbeddedImageView;
});