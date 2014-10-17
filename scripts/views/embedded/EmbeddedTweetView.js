define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var ResizableImageView = require('views/ResizableImageView');
	var EmbeddedTweetView = EmbeddedView.extend({
		className: 'embedded-content embedded-tweet',
		init: function () {
			this.canFetch = true;
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
			var url = this.watch.get('url');
			var match = url.match(EmbeddedTweetView.tweetExp);
			var id = match[2];
			var oembedUrl = 'https://api.twitter.com/1/statuses/oembed.json?format=jsonp&id=' + id;
			$.ajax({
				url: oembedUrl,
				context: this,
				dataType: 'jsonp',
				success: function (response) {
					var html = response.html;
					this.renderTweet(html);
				},
				error: function (xhr, status, message) {
					this.showError();
					this.canFetch = true;
				}
			});
		},
		renderTweet: function (html) {
			this.empty();
			this.$el.html(html);
		},
		showLoading: function () {
			var $loading = $.create('span')
				.addClass('text-muted')
				.text('Loading\u2026');
			this.empty();
			this.$el.append($loading);
		},
		showError: function () {
			this.$el.text('There was an error loading this tweet');
		}
	});
	EmbeddedTweetView.tweetExp = /^https?:\/\/twitter\.com\/(\w+)\/status\/(\d+)/i;
	EmbeddedTweetView.identify = function (linkModel) {
		var url = linkModel.get('url');
		return EmbeddedTweetView.tweetExp.test(url);
	};
	return EmbeddedTweetView;
});