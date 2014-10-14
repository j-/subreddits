define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	return ok.$View.extend({
		tagName: 'a',
		className: 'inline-user',
		render: function () {
			var url = this.watch.getUserPageURL();
			var name = this.watch.get('name');
			this.$el
				.empty()
				.attr('href', url);
			$.textNode('/u/')
				.appendTo(this.$el);
			$.create('span')
				.addClass('name')
				.text(name)
				.appendTo(this.$el);
		}
	});
});