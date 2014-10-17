define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var ResizableImageView = require('views/ResizableImageView');
	var EmbeddedDeviantartView = EmbeddedView.extend({
		className: 'embedded-content embedded-deviantart',
		init: function () {
			this.canFetch = true;
			this.imageView = new ResizableImageView({
				href: this.watch.get('url')
			});
		},
		render: function () {
			this.ensureContent();
		},
		ensureContent: function () {
			if (!this.canFetch) {
				return;
			}
			this.showLoading();
			this.canFetch = false;
			this.imageView.render();
			var url = this.watch.get('url');
			var match = url.match(EmbeddedDeviantartView.hostExp);
			var author = match[1];
			var title = match[2];
			var oembedUrl = 'http://backend.deviantart.com/oembed?format=jsonp&url=' + encodeURIComponent(url);
			$.ajax({
				url: oembedUrl,
				context: this,
				dataType: 'jsonp',
				success: function (response) {
					var url = response.url;
					this.renderImage(url);
				},
				error: function (xhr, status, message) {
					this.showError();
					this.canFetch = true;
				}
			});
		},
		renderImage: function (url) {
			this.imageView.setImageURL(url);
			this.empty();
			this.$el.append(this.imageView.el);
		},
		showLoading: function () {
			var $loading = $.create('span')
				.addClass('text-muted')
				.text('Loading\u2026');
			this.empty();
			this.$el.append($loading);
		},
		showError: function () {
			this.$el.text('There was an error loading this artwork');
		},
		start: function () {
			EmbeddedView.prototype.start.call(this);
			this.imageView.start();
		},
		stop: function () {
			EmbeddedView.prototype.stop.call(this);
			this.imageView.stop();
		}
	});
	EmbeddedDeviantartView.hostExp = /^https?:\/\/([^.]+)\.deviantart\.com\/art\/(.*?)/i;
	EmbeddedDeviantartView.identify = function (linkModel) {
		var url = linkModel.get('url');
		return EmbeddedDeviantartView.hostExp.test(url);
	};
	return EmbeddedDeviantartView;
});