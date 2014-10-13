define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var html = require('text!templates/Header.html');
	var HeaderView = ok.$View.extend({
		className: 'listing-controls navbar navbar-default navbar-fixed-top navbar-inverse',
		render: function () {
			this.$el.html(html);
		},
		handleClickSort: function (e) {
			e.preventDefault();
			var $target = $(e.target);
			var sort = $target.data('sort');
			var t = $target.data('t');
			this.trigger('sort', sort, t);
			this.$('a[data-sort]').parents('li').removeClass('active');
			$target.parent('li').addClass('active');
			$target.parents('.dropdown-submenu').addClass('active');
		},
		start: function () {
			this.$el.on('click', 'a[data-sort]', _.bind(this.handleClickSort, this));
		},
		stop: function fn () {
			fn.old.call(this);
			this.$el.off('click', 'a[data-sort]');
		}
	});
	return HeaderView;
});