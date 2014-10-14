define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var EmbeddedView = ok.$View.extend({
		className: 'embedded-content'
	});
	EmbeddedView.identify = function () {
		return false;
	};
	return EmbeddedView;
});