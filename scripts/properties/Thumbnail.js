define(function (require) {
	var ok = require('ok');
	var Thumbnail = ok.Property.extend({
		get: function () {
			var thumbnail = this.getValue();
			switch (thumbnail) {
				case 'self':
				case 'default':
				case 'nsfw':
				case '':
					return null;
				default:
					return thumbnail;
			}
		}
	});
	return Thumbnail;
});