define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var html = require('text!templates/Link.html');
	var FAVICON_BASE_URL = '//plus.google.com/_/favicon?domain=';
	var LinkView = ok.$View.extend({
		className: 'link',
		render: function () {
			this.empty();
			this.$el.html(html);
			this.renderThumbnail();
			this.renderTitle();
			this.renderURL();
			this.renderScore();
			this.renderCreated();
			this.renderAuthor();
			this.renderComments();
			this.renderSubreddit();
		},
		renderThumbnail: function () {
			var thumbnail = this.watch.get('thumbnail');
			if (thumbnail) {
				this.$('.thumbnail')
					.css('background-image', 'url(' + thumbnail + ')')
					.removeClass('empty');
			}
			else {
				this.$('.thumbnail')
					.css('background-image', null)
					.addClass('empty');
			}
		},
		renderTitle: function () {
			this.$('.title-text')
				.text(_.unescape(this.watch.get('title')));
		},
		renderURL: function () {
			var url = this.watch.get('url');
			this.$('.title')
				.attr('href', url);
			this.$('.favicon')
				.attr('src', this.getFaviconURL(url));
		},
		renderScore: function () {
			var score = this.watch.get('score');
			score += ' ' + (score === 1 ? 'point' : 'points');
			this.$('.score')
				.text(score);
		},
		renderCreated: function () {
			var created = this.watch.get('created_utc');
			this.$('.time')
				.text(created.toLocaleString());
		},
		renderAuthor: function () {
			var author = this.watch.get('author');
			this.$('.author')
				.text(author);
		},
		renderComments: function () {
			var comments = this.watch.get('num_comments');
			comments += ' ' + (comments === 1 ? 'comment' : 'comments');
			this.$('.comments')
				.text(comments);
		},
		renderSubreddit: function () {
			var subreddit = this.watch.get('subreddit');
			this.$('.subreddit')
				.text(subreddit);
		},
		getFaviconURL: function (url) {
			return FAVICON_BASE_URL + encodeURIComponent(url);
		}
	});
	return LinkView;
});