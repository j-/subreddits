define(function (require) {
	var ok = require('ok');
	var MessageModel = ok.Map.extend({
		defaults: {
			type: 't4'
		}
	});
	return MessageModel;
});