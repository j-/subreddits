define(function (require) {
	var ok = require('ok');
	var AccountModel = ok.Map.extend({
		defaults: {
			kind: 't2'
		}
	});
	return AccountModel;
});