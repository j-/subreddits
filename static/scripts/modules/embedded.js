define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');

	var views = [
		require('views/embedded/EmbeddedSelfTextView')
	];

	var EmbeddedMediaController = ok.Controller.extend({
		identify: function (linkModel) {
			return _.find(views, function (View) {
				return View.identify(linkModel);
			});
		}
	});

	return new EmbeddedMediaController();
});