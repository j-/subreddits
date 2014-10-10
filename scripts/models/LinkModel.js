define(function (require) {
	var ok = require('ok');
	var LinkModel = ok.Map.extend({
		defaults: {
			kind: 't3'
		}
	});
	return LinkModel;
});