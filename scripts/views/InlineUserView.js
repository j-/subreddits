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
			if (this.watch.isDeleted()) {
				this.$el.addClass('deleted');
				this.renderDeleted();
				return;
			}
			var url = this.watch.getUserPageURL();
			var name = this.watch.get('name');
			this.empty();
			this.$el
				.removeClass('deleted')
				.attr('href', url);
			$.textNode('/u/')
				.appendTo(this.$el);
			$.create('span')
				.addClass('name')
				.text(name)
				.appendTo(this.$el);
		},
		renderDeleted: function () {
			this.$el
				.text('[deleted]')
				.attr('href', null);
		},
		handleClick: function (e) {
			if (this.watch.isDeleted()) {
				e.preventDefault();
				return;
			}
			if (!e.ctrlKey) {
				e.preventDefault();
				var name = this.watch.get('name');
				pagerouter.go('/user/' + name);
			}
		},
		start: function () {
			this.stop();
			this.$el.on('click', this.handleClick);
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('click', this.handleClick);
		}
	});
});