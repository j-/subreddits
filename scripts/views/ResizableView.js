define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var ResizableImageView = ok.$View.extend({
		className: 'resizable',
		constructor: function (options) {
			ok.$View.apply(this, arguments);
			_.bindAll(this, 'handleClick', 'handleMouseMove', 'handleMouseDown', 'handleMouseUp');
			this.didMove = false;
			this.offsetLeft = null;
			this.offsetTop = null;
			this.beginDistance = null;
		},
		calculateDistance: function (x, y) {
			return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		},
		handleMouseDown: function (e) {
			e.preventDefault();
			var offset = this.$el.offset();
			this.offsetLeft = offset.left - document.body.scrollLeft;
			this.offsetTop = offset.top - document.body.scrollTop;
			var beginScreenX = e.screenX;
			var beginScreenY = e.screenY;
			var differenceX = beginScreenX - this.offsetLeft;
			var differenceY = beginScreenY - this.offsetTop;
			this.beginDistance = this.calculateDistance(differenceX, differenceY);
			this.startResizing();
			$(window).on('mousemove', this.handleMouseMove);
			$(window).one('mouseup', this.handleMouseUp);
		},
		handleMouseMove: function (e) {
			var screenX = e.screenX;
			var screenY = e.screenY;
			var newDifferenceX = screenX - this.offsetLeft;
			var newDifferenceY = screenY - this.offsetTop;
			var newDistance = this.calculateDistance(newDifferenceX, newDifferenceY);
			var scale = newDistance / this.beginDistance;
			this.resize(scale);
		},
		handleMouseUp: function () {
			this.stopResizing();
			$(window).off('mousemove', this.handleMouseMove);
		},
		handleClick: function (e) {
			if (this.didMove) {
				e.preventDefault();
			}
		},
		startResizing: function () {
			// mouse has not moved yet
			this.didMove = false;
			this.originalWidth = this.$el.width();
			// fix the element at its current width
			this.$el.width(this.$el.width());
		},
		resize: function (scale) {
			// mouse is now moving
			this.didMove = true;
			this.$el.width(this.originalWidth * scale);
		},
		stopResizing: function () {
			// no-op
		},
		start: function () {
			ok.$View.prototype.start.call(this);
			this.$el.on('mousedown', this.handleMouseDown);
			this.$el.on('click', this.handleClick);
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('mousedown', this.handleMouseDown);
			this.$el.off('click', this.handleClick);
		}
	});
	return ResizableImageView;
});