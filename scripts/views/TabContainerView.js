define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var $ = require('jquery');
	var _ = require('underscore');
	var UP = 38;
	var LEFT = 37;
	var DOWN = 40;
	var RIGHT = 39;
	var TabContainerView = ok.$View.extend({
		init: function () {
			_.bindAll(this, 'handleKeyDown', 'handleFocus', 'handleFocusItem', 'handleBlur');
		},
		start: function () {
			this.stop();
			$(window).on('keydown', this.handleKeyDown);
			this.$el.on('focus', this.handleFocus);
			this.$el.on('focus', 'a', this.handleFocusItem);
			// need to capture, not bubble
			this.el.addEventListener('blur', this.handleBlur, true);
		},
		stop: function () {
			$(window).off('keydown', this.handleKeyDown);
			this.$el.off('focus', this.handleFocus);
			this.$el.off('focus', 'a', this.handleFocusItem);
			this.el.removeEventListener('blur', this.handleBlur);
		},
		getSelector: function () {
			return this.selector || 'a:visible';
		},
		goUp: function () {
				var selector = this.getSelector();
				var $active = $(document.activeElement);
				var $container = this.$el;
				var $items = $container.find(selector);
				var index = $items.index($active) - 1;
				index = Math.min(Math.max(index, 0), $items.length);
				this.$lastFocus = $items.eq(index).focus();
		},
		goDown: function () {
				var selector = this.getSelector();
				var $active = $(document.activeElement);
				var $container = this.$el;
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
			this.$el
				.attr('tabindex', -1)
				.blur();
			if (this.$lastFocus) {
				this.$lastFocus.focus();
			}
			else {
				var selector = this.getSelector();
				var $active = $(document.activeElement);
				var $container = this.$el;
				var $items = $container.find(selector);
				$items.first().focus();
			}
		},
		handleFocusItem: function () {
			this.$lastFocus = $(document.activeElement);
		},
		handleBlur: function () {
			this.$el
				.attr('tabindex', 0);
		}
	});
	return TabContainerView;
});