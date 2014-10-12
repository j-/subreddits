define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var AccountModel = require('models/AccountModel');
	var SubredditModel = require('models/SubredditModel');
	var InlineUserView = require('views/InlineUserView');
	var InlineSubredditView = require('views/InlineSubredditView');
	var html = require('text!templates/Link.html');
	var FAVICON_BASE_URL = '//plus.google.com/_/favicon?domain=';
	var LinkView = ok.$View.extend({
		className: 'link',
		init: function () {
			this.author = new AccountModel({
				name: this.watch.get('author')
			});
			this.inlineUserView = new InlineUserView({
				watch: this.author
			});
			this.subreddit = new SubredditModel({
				display_name: this.watch.get('subreddit')
			});
			this.inlineSubredditView = new InlineSubredditView({
				watch: this.subreddit
			});
		},
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
			this.inlineUserView.render();
			this.$('.author')
				.empty()
				.append(this.inlineUserView.el);
		},
		renderComments: function () {
			var commentURL = this.watch.getCommentURL();
			var comments = this.watch.get('num_comments');
			comments += ' ' + (comments === 1 ? 'comment' : 'comments');
			this.$('.comments')
				.attr('href', commentURL)
				.attr('title', 'View comments')
				.text(comments);
		},
		renderSubreddit: function () {
			this.inlineSubredditView.render();
			this.$('.subreddit')
				.empty()
				.append(this.inlineSubredditView.el);
		},
		getFaviconURL: function (url) {
			return FAVICON_BASE_URL + encodeURIComponent(url);
		}
	});
	return LinkView;
});