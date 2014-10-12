define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var LinkView = ok.View.extend({
		render: function () {
			this.el.innerHTML = 'this is a link';
		}
	});
	return LinkView;
});