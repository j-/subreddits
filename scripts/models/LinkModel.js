define(function (require) {
	var ok = require('ok');
	var LinkModel = ok.Map.extend({
		defaults: {
			type: 't3'
		}
	});
	return LinkModel;
});