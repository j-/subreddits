define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var pagerouter = require('modules/pagerouter');
	return ok.$View.extend({
		tagName: 'a',
		className: 'inline-user',
		init: function () {
			_.bindAll(this, 'handleClick');
		},
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
		},
		handleClick: function (e) {
			e.preventDefault();
			var name = this.watch.get('name');
			pagerouter.go('/user/' + name);
		},
		start: function () {
			this.$el.on('click', this.handleClick);
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('click', this.handleClick);
		}
	});
});