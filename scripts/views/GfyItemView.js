define(function (require) {
	var ok = require('ok');
	require('ok.views');
	var GfyItemView = ok.View.extend({
		render: function () {
			this.empty();
			var video = document.createElement('video');
			var id = this.watch.get('gfyName');
			video.autoplay = true;
			video.loop = true;
			video.muted = true;
			video.playbackRate = 1;
			video.preload = true;
			video.poster = 'http://thumbs.gfycat.com/' + id + '-poster.jpg';
			video.src = this.watch.get('webmUrl');
			this.el.appendChild(video);
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