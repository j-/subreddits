define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var FAVICON_BASE_URL = '//plus.google.com/_/favicon?domain=';
	var LinkTitleView = ok.$View.extend({
		tagName: 'a',
		className: 'link-title',
		render: function () {
			var url = this.watch.get('url');
			var title = this.watch.get('title');
			var favicon = LinkTitleView.getFaviconURL(url);
			this.empty();
			$.create('img')
				.addClass('favicon')
				.attr('src', favicon)
				.appendTo(this.$el);
			$.create('span')
				.addClass('title-text')
				.text(title)
				.appendTo(this.$el);
			this.$el.attr('href', url);
		}
	});
	LinkTitleView.getFaviconURL = function (url) {
		return FAVICON_BASE_URL + encodeURIComponent(url);
	};
	return LinkTitleView;
});