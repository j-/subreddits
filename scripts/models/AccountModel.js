define(function (require) {
	var ok = require('ok');
	var AccountModel = ok.Map.extend({
		defaults: {
			type: 't2'
		}
	});
	return AccountModel;
});