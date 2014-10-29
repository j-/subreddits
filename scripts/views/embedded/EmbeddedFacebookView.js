define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var _ = require('underscore');
	var html = require('text!templates/FacebookEmbed.html');
	var template = _.template(html);
	var EmbeddedFacebookView = EmbeddedView.extend({
		className: 'embedded-content embedded-facebook',
		init: function () {
			this.renderedContent = false;
		},
		render: function () {
			this.ensureContent();
		},
		ensureContent: function () {
			if (this.renderedContent) {
				return;
			}
			this.renderedContent = true;
			var locals = {
				url: this.watch.get('url')
			};
			var html = template(locals);
			this.empty();
			this.$el.html(html);
		}
	});
	EmbeddedFacebookView.hostExp = /^https?:\/\/(?:.*?\.)?facebook\.com\/(?:notes\/)/;
	EmbeddedFacebookView.identify = function (linkModel) {
		var url = linkModel.get('url');
		return EmbeddedFacebookView.hostExp.test(url);
	};
	return EmbeddedFacebookView;
});