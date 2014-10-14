define(function (require) {
	var ok = require('ok');
	var ThingModel = ok.Map.extend({
		setMap: function (attrs) {
			if (typeof attrs.kind === 'string' && attrs.data) {
				return ok.Map.prototype.setMap.call(this, attrs.data);
			}
			return ok.Map.prototype.setMap.call(this, attrs);
		}
	});
	return ThingModel;
});