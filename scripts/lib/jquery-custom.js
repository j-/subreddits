define(function (require) {
	var $ = require('jquery');

	$.create = function (el) {
		return $(document.createElement(el));
	};

	$.textNode = function (text) {
		return $(document.createTextNode(text));
	};

	return $;
});