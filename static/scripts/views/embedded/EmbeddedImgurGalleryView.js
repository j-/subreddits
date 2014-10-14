define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var $ = require('jquery');
	var EmbeddedImgurGalleryView = EmbeddedView.extend({
		className: 'embedded-content embedded-imgurgallery',
		render: function () {
			var url = this.watch.get('url');
			var galleryId = EmbeddedImgurGalleryView.getGalleryId(url);
			var $iframe = $.create('iframe')
				.attr({
					src: 'http://imgur.com/a/' + galleryId + '/embed',
					frameborder: 0,
					scrolling: 'no',
					width: 600,
					height: 550
				});
			this.$el
				.empty()
				.append($iframe);
		}
	});
	EmbeddedImgurGalleryView.domainExp = /^https?:\/\/(?:www|i|m\.)?imgur.com/i;
	EmbeddedImgurGalleryView.galleryIdExp = /\/(?:a|gallery)\/(.*?)(?:\W|$)/i;
	EmbeddedImgurGalleryView.getGalleryId = function (url) {
		var match = url.match(EmbeddedImgurGalleryView.galleryIdExp);
		if (match) {
			return match[1];
		}
		return null;
	};
	EmbeddedImgurGalleryView.identify = function (linkModel) {
		var linkUrl = linkModel.get('url');
		return EmbeddedImgurGalleryView.domainExp.test(linkUrl) &&
			EmbeddedImgurGalleryView.galleryIdExp.test(linkUrl);
	};
	return EmbeddedImgurGalleryView;
});