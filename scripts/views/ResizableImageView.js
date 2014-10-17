define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var ResizableImageView = ok.$View.extend({
		tagName: 'a',
		init: function (options) {
			this.$img = $();
			this.didMove = false;
			this.url = options.url;
			this.href = options.href || this.url;
		},
		render: function () {
			this.empty();
			this.$img = $.create('img')
				.addClass('drag-image')
				.attr('src', this.url);
			this.$el
				.attr('href', this.href)
				.attr('target', '_blank')
				.append(this.$img);
		},
		setImageURL: function (url) {
			this.url = url;
			this.$img.attr('src', this.url);
		},
		setAnchorHref: function (href) {
			this.href = href;
			this.$el.attr('href', this.href);
		},
		calculateDistance: function (x, y) {
			return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		},
		handleMouseDown: function (e) {
			e.preventDefault();
			var offset = this.$img.offset();
			this.offsetLeft = offset.left;
			this.offsetTop = offset.top;
			var beginScreenX = e.screenX;
			var beginScreenY = e.screenY;
			var differenceX = beginScreenX - this.offsetLeft;
			var differenceY = beginScreenY - this.offsetTop;
			this.beginDistance = this.calculateDistance(differenceX, differenceY);
			this.startResizing();
			this.mouseMoveHandler = _.bind(this.handleMouseMove, this);
			$(window).on('mousemove', this.mouseMoveHandler);
			$(window).one('mouseup', _.bind(this.handleMouseUp, this));
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
			$(window).off('mousemove', this.mouseMoveHandler);
		},
		handleClick: function (e) {
			if (this.didMove) {
				e.preventDefault();
			}
		},
		startResizing: function () {
			// mouse has not moved yet
			this.didMove = false;
			this.originalWidth = this.$img.width();
			// fix the image at its current width
			this.$img.width(this.$img.width());
			// remove the maximum width restriction
			this.$img.css('max-width', 'inherit');
		},
		resize: function (scale) {
			// mouse is now moving
			this.didMove = true;
			this.$img.width(this.originalWidth * scale);
		},
		stopResizing: function () {
			// no-op
		},
		start: function () {
			this.$el.on('mousedown', '.drag-image', _.bind(this.handleMouseDown, this));
			this.$el.on('click', _.bind(this.handleClick, this));
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('mousedown', '.drag-image');
			this.$el.off('click');
		}
	});
	return ResizableImageView;
});