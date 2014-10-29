define(function (require) {
	var ok = require('ok');
	var GfyItemModel = ok.Map.extend({
		defaults: {
			gfyId: null,
			gfyName: null,
			gfyNumber: null,
			userName: null,
			width: 0,
			height: 0,
			frameRate: 0,
			numFrames: 0,
			mp4Url: null,
			webmUrl: null,
			gifUrl: null,
			gifSize: 0,
			mp4Size: 0,
			webmSize: 0,
			createDate: null,
			views: 0,
			title: null,
			extraLemmas: null,
			md5: null,
			tags: null,
			nsfw: null,
			sar: null,
			url: null,
			source: null,
			dynamo: null,
			subreddit: null,
			redditId: null,
			redditIdText: null,
			uploadGifName: null
		}
	});
	return GfyItemModel;
});