define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var GfyItemModel = require('models/GfyItemModel');
	var GfyItemView = require('views/GfyItemView');
	var EmbeddedGfycatView = EmbeddedView.extend({
		className: 'embedded-content embedded-gfycat',
		init: function () {
			this.canFetch = true;
			this.gfyView = null;
		},
		render: function () {
			this.ensureContent();
			if (this.gfyView) {
				this.gfyView.play();
			}
		},
		ensureContent: function () {
			if (!this.canFetch) {
				return;
			}
			this.showLoading();
			this.canFetch = false;
			var url = this.watch.get('url');
			var id = EmbeddedGfycatView.getIdFromUrl(url);
			var ajaxUrl = 'http://gfycat.com/cajax/get/' + id;
			$.ajax({
				url: ajaxUrl,
				context: this,
				dataType: 'jsonp',
				success: function (response) {
					this.processResponse(response);
				},
				error: function (xhr, status, message) {
					this.showError();
					this.canFetch = true;
				}
			});
		},
		processResponse: function (response) {
			this.empty();
			this.gfyView = new GfyItemView({
				watch: new GfyItemModel(response.gfyItem)
			});
			this.gfyView.render();
			this.el.appendChild(this.gfyView.el);
		},
		showLoading: function () {
			var $loading = $.create('span')
				.addClass('text-muted')
				.text('Loading\u2026');
			this.empty();
			this.$el.append($loading);
		},
		showError: function () {
			this.$el.text('There was an error loading this tweet');
		},
		start: function () {
			EmbeddedView.prototype.start.call();
			if (this.gfyView) {
				this.gfyView.start();
			}
		},
		stop: function () {
			EmbeddedView.prototype.stop.call();
			if (this.gfyView) {
				this.gfyView.stop();
			}
		}
	});
	EmbeddedGfycatView.gfycatExp = /^https?:\/\/(?:(?:www|zippy|fat|giant)\.)?gfycat\.com\/(\w+)(?:\.\w+)?/i;
	EmbeddedGfycatView.identify = function (linkModel) {
		var url = linkModel.get('url');
		return EmbeddedGfycatView.gfycatExp.test(url);
	};
	EmbeddedGfycatView.getIdFromUrl = function (url) {
		var match = url.match(EmbeddedGfycatView.gfycatExp);
		var id = match[1];
		return id;
	};
	return EmbeddedGfycatView;
});