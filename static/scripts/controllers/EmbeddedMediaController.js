define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');

	var views = [
		require('views/embedded/SelfText')
	];

	var EmbeddedMediaController = ok.Controller.extend({
		identify: function (linkModel) {
			return _.find(views, function (View) {
				return View.idenfify(linkModel);
			});
		}
	});

	return new EmbeddedMediaController();
});