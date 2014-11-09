define(function (require) {
	var ThingModel = require('models/ThingModel');
	var Thumbnail = require('properties/Thumbnail');
	var UTCDate = require('properties/UTCDate');
	var LinkModel = ThingModel.extend({
		schema: {
			thumbnail: Thumbnail,
			created_utc: UTCDate
		},
		defaults: {
			approved_by: null,
			author: null,
			author_flair_css_class: null,
			author_flair_text: null,
			banned_by: null,
			clicked: false,
			created: 0,
			created_utc: 0,
			distinguished: null,
			domain: null,
			downs: 0,
			edited: false,
			gilded: 0,
			hidden: false,
			id: null,
			is_self: false,
			kind: 't3',
			likes: null,
			link_flair_css_class: null,
			link_flair_text: null,
			media: null,
			media_embed: null,
			mod_reports: null,
			name: null,
			num_comments: 0,
			num_reports: null,
			over_18: false,
			permalink: null,
			report_reasons: null,
			saved: false,
			score: 0,
			secure_media: null,
			secure_media_embed: null,
			selftext: null,
			selftext_html: null,
			stickied: false,
			subreddit: null,
			subreddit_id: null,
			thumbnail: null,
			title: null,
			ups: 0,
			upvote_ratio: 0,
			url: '',
			user_reports: null,
			visited: false
		},
		getCommentURL: function () {
			return 'http://www.reddit.com/comments/' + this.get('id');
		}
	});
	return LinkModel;
});