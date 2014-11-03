define(function (require) {
	var ResizableView = require('views/ResizableView');
	var GfyItemView = ResizableView.extend({
		tagName: 'a',
		render: function () {
			this.empty();
			var video = document.createElement('video');
			var id = this.watch.get('gfyName');
			var url = 'http://gfycat.com/' + id;
			video.autoplay = true;
			video.loop = true;
			video.muted = true;
			video.playbackRate = 1;
			video.preload = true;
			video.poster = 'http://thumbs.gfycat.com/' + id + '-poster.jpg';
			video.src = this.watch.get('webmUrl');
			this.$el
				.attr('href', url)
				.append(video);
		},
		play: function () {
			var video = this.el.getElementsByTagName('video')[0];
			if (video) {
				video.play();
			}
		}
	});
	return GfyItemView;
});