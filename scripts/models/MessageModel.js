define(function (require) {
	var ok = require('ok');
	var MessageModel = ok.Map.extend({
		defaults: {
			kind: 't4'
		}
	});
	return MessageModel;
});