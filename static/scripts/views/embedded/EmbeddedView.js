define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var EmbeddedView = ok.$View.extend({
		className: 'embedded'
	});
	EmbeddedView.identify = function () {
		return false;
	};
	return EmbeddedView;
});