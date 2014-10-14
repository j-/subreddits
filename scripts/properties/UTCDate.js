define(function (require) {
	var ok = require('ok');
	var UTCDate = ok.Property.extend({
		get: function () {
			var raw = this.getValue();
			var date = new Date(raw * 1000);
			return date;
		}
	});
	return UTCDate;
});