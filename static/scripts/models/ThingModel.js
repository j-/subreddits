define(function (require) {
	var ok = require('ok');
	var ThingModel = ok.Map.extend({
		setMap: function fn (attrs) {
			if (typeof attrs.kind === 'string' && attrs.data) {
				return fn.old.call(this, attrs.data);
			}
			return fn.old.call(this, attrs);
		}
	});
	return ThingModel;
});