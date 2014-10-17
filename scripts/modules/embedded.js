define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');

	var views = [
		require('views/embedded/EmbeddedContentView'),
		require('views/embedded/EmbeddedSelfTextView'),
		require('views/embedded/EmbeddedImgurGalleryView'),
		require('views/embedded/EmbeddedImageView'),
		require('views/embedded/EmbeddedGithubReadmeView')
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