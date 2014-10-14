define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var EmbeddedImageView = EmbeddedView.extend({
		className: 'embedded-content embedded-image',
		render: function () {
			var linkUrl = this.watch.get('url');
			var imageUrl = EmbeddedImageView.getImageURL(linkUrl);
			var image = new Image();
			image.src = imageUrl;
			this.$el
				.empty()
				.append(image);
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