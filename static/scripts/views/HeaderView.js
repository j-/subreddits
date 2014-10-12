define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var html = require('text!templates/Header.html');
	var HeaderView = ok.View.extend({
		className: 'listing-controls navbar navbar-default navbar-fixed-top navbar-inverse',
		render: function () {
			this.el.innerHTML = html;
		}
	});
	return HeaderView;
});