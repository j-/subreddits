define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var $ = require('jquery');
	var _ = require('underscore');
	var UP = 38;
	var LEFT = 37;
	var DOWN = 40;
	var RIGHT = 39;
	var TabContainerView = ok.View.extend({
		start: function () {
			this.stop();
			$(window).on('keydown.tabContainerView', _.bind(this.handleKeyDown, this));
			$(this.el).on('focus.tabContainerView', _.bind(this.handleFocus, this));
			$(this.el).on('focus.tabContainerView', 'a', _.bind(this.handleFocusItem, this));
			this.el.addEventListener('blur', _.bind(this.handleBlur, this), true);
		},
		stop: function () {
			$(window).off('.tabContainerView');
			$(this.el).off('.tabContainerView');
			this.el.removeEventListener('blur');
		},
		getSelector: function () {
			return this.selector || 'a:visible';
		},
		goUp: function () {
				var selector = this.getSelector();
				var $active = $(document.activeElement);
				var $container = $(this.el);
				var $items = $container.find(selector);
				var index = $items.index($active) - 1;
				index = Math.min(Math.max(index, 0), $items.length);
				this.$lastFocus = $items.eq(index).focus();
		},
		goDown: function () {
				var selector = this.getSelector();
				var $active = $(document.activeElement);
				var $container = $(this.el);
				var $items = $container.find(selector);
				var index = $items.index($active) + 1;
				index = Math.min(Math.max(index, 0), $items.length);
				this.$lastFocus = $items.eq(index).focus();
		},
		handleKeyDown: function (e) {
			var container = this.el;
			var key = e.which;
			var arrow = key === UP || key === DOWN || key === LEFT || key === RIGHT;
			var inContainer = $.contains(container, document.activeElement);
			var selector, $active, $container, $items, index;
			if (arrow && inContainer) {
				e.preventDefault();
				if (key === UP) {
					this.goUp();
				}
				else if (key === DOWN) {
					this.goDown();
				}
			}
		},
		handleFocus: function () {
			$(this.el)
				.attr('tabindex', -1)
				.blur();
			if (this.$lastFocus) {
				this.$lastFocus.focus();
			}
			else {
				var selector = this.getSelector();
				var $active = $(document.activeElement);
				var $container = $(this.el);
				var $items = $container.find(selector);
				$items.first().focus();
			}
		},
		handleFocusItem: function () {
			this.$lastFocus = $(document.activeElement);
		},
		handleBlur: function () {
			$(this.el)
				.attr('tabindex', 0);
		}
	});
	return TabContainerView;
});