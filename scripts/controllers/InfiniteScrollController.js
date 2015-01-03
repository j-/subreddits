define(function (require) {
	var ok = require('ok');
	var $ = require('jquery');
	var InfiniteScrollController = ok.Controller.extend({
		scrollElement: window,
		scrollThreshold: 200,
		resumeDelay: 0,
		canTrigger: true,
		init: function (options) {
			// bind context
			_.bindAll(this, 'handleScroll');
			// load options
			_.extend(this, _.pick(options, 'scrollElement', 'scrollThreshold', 'resumeDelay'));
			// cache scroll element
			this.$scrollElement = $(this.scrollElement);
		},
		pause: function () {
			this.canTrigger = false;
			this.trigger('bottom');
		},
		resume: function () {
			this.canTrigger = true;
			var context = this;
			setTimeout(function () {
				context.testScroll();
			}, this.resumeDelay);
		},
		getScrollTop: function () {
			return this.$scrollElement.scrollTop();
		},
		getScrollHeight: function () {
			return document.body.scrollHeight;
		},
		getScrollBottom: function () {
			return this.getScrollTop() + this.scrollElement.innerHeight;
		},
		isCloseToBottom: function () {
			var height = this.getScrollHeight();
			var bottom = this.getScrollBottom();
			var threshold = this.scrollThreshold;
			return height - bottom < threshold;
		},
		testScroll: function () {
			if (this.canTrigger && this.isCloseToBottom()) {
				this.pause();
			}
		},
		handleScroll: function () {
			this.testScroll();
		},
		start: function () {
			this.$scrollElement.on('scroll', this.handleScroll);
		},
		stop: function () {
			this.$scrollElement.off('scroll', this.handleScroll);
		}
	});
	return InfiniteScrollController;
});