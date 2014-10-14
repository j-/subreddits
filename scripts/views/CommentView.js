define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var CommentView = ok.View.extend({
		render: function () {
			this.el.innerHTML = 'this is a comment';
		}
	});
	return CommentView;
});