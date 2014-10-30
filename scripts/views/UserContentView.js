define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var UserContentView = ok.$View.extend({
		className: 'user-content',
		render: function () {
			var html = this.watch.get();
			html = _.unescape(html);
			this.$el.html(html);
		}
	});
	return UserContentView;
});