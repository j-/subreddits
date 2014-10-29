define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var html = require('text!templates/Header.html');

	var ACTIVE_CLASS = 'active';

	var displaySort = {
		'hot': 'Hot',
		'new': 'New',
		'rising': 'Rising',
		'controversial': 'Controversial',
		'top': 'Top',
		'gilded': 'Gilded',
		'ads': 'Promoted'
	};

	var displayTime = {
		'hour': 'This hour',
		'day': 'Today',
		'week': 'This week',
		'month': 'This month',
		'year': 'This year',
		'all': 'All'
	};

	var HeaderView = ok.$View.extend({
		className: 'listing-controls navbar navbar-default navbar-fixed-top navbar-inverse',
		init: function () {
			_.bindAll(this, 'handleClickSort', 'handleClickRefresh');
		},
		render: function () {
			this.$el.html(html);
		},
		handleClickSort: function (e) {
			e.preventDefault();
			var $target = $(e.target);
			var sort = $target.data('sort');
			var t = $target.data('t');
			this.trigger('sort', sort, t);
			this.$('a[data-sort]').parents('li').removeClass(ACTIVE_CLASS);
			$target.parent('li').addClass(ACTIVE_CLASS);
			$target.parents('.dropdown-submenu').addClass(ACTIVE_CLASS);
			this.indicateSort(sort, t);
		},
		handleClickRefresh: function (e) {
			e.preventDefault();
			this.trigger('refresh');
		},
		indicateSort: function (sort, t) {
			sort = displaySort[sort];
			var $el = this.$('.sorting-by')
				.empty()
				.text(sort);
			if (t) {
				t = displayTime[t];
				$.textNode(' ')
					.appendTo($el);
				$.create('small')
					.text('(' + t + ')')
					.appendTo($el);
			}
		},
		start: function () {
			this.$el.on('click', 'a[data-sort]', this.handleClickSort);
			this.$el.on('click', '.action-refresh', this.handleClickRefresh);
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('click', 'a[data-sort]', this.handleClickSort);
			this.$el.off('click', '.action-refresh', this.handleClickRefresh);
		}
	});
	return HeaderView;
});