define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var AccountModel = require('models/AccountModel');
	var SubredditModel = require('models/SubredditModel');
	var InlineUserView = require('views/InlineUserView');
	var InlineSubredditView = require('views/InlineSubredditView');
	var html = require('text!templates/FullComment.html');
	var FAVICON_BASE_URL = '//plus.google.com/_/favicon?domain=';
	var FullCommentView = ok.$View.extend({
		className: 'comment full-comment',
		init: function () {
			this.linkAuthorModel = new AccountModel({
				name: this.watch.get('link_author')
			});
			this.commentAuthorModel = new AccountModel({
				name: this.watch.get('author')
			});
			this.subreddit = new SubredditModel({
				display_name: this.watch.get('subreddit')
			});
			this.inlineLinkAuthorUserView = new InlineUserView({
				watch: this.linkAuthorModel
			});
			this.inlineCommentAuthorUserView = new InlineUserView({
				watch: this.commentAuthorModel
			});
			this.inlineSubredditView = new InlineSubredditView({
				watch: this.subreddit
			});
		},
		render: function () {
			this.empty();
			this.$el
				.html(html);
			this.renderLinkTitle();
			this.renderLinkURL();
			this.renderLinkAuthor();
			this.renderLinkSubreddit();
			this.renderCommentAuthor();
			this.renderScore();
			this.renderTime();
			this.renderBody();
			this.renderPermalink();
			this.renderContextLink();
			this.renderFullCommentsLink();
		},
		renderLinkTitle: function () {
			var html = this.watch.get('link_title');
			html = _.unescape(html);
			this.$('.link-title-text').html(html);
		},
		renderLinkURL: function () {
			var url = this.watch.get('link_url');
			this.$('.link-title').attr('href', url);
			this.$('.favicon').attr('src', this.getFaviconURL(url));
		},
		renderLinkAuthor: function () {
			this.inlineLinkAuthorUserView.setElement(this.$('.link-author'));
			this.inlineLinkAuthorUserView.render();
		},
		renderLinkSubreddit: function () {
			this.inlineSubredditView.setElement(this.$('.link-subreddit'));
			this.inlineSubredditView.render();
		},
		renderCommentAuthor: function () {
			var author = this.watch.get('author');
			var linkAuthor = this.watch.get('link_author');
			var $author = this.$('.comment-author');
			this.inlineCommentAuthorUserView.setElement($author);
			this.inlineCommentAuthorUserView.render();
			$author.toggleClass('is-op', author === linkAuthor);
		},
		renderScore: function () {
			var score = this.watch.get('score');
			score += ' ' + (score === 1 ? 'point' : 'points');
			this.$('.comment-score').text(score);
		},
		renderTime: function () {
			var createdUtc = this.watch.get('created_utc');
			var createdDate = new Date(createdUtc * 1000);
			var time = createdDate.toLocaleString();
			this.$('.comment-time').text(time);
		},
		renderBody: function () {
			var html = this.watch.get('body_html');
			html = _.unescape(html);
			this.$('.comment-body').html(html);
		},
		renderPermalink: function () {
			var linkId = this.watch.get('link_id').substring(3);
			var commentId = this.watch.get('id');
			var href = 'http://www.reddit.com/comments/' + linkId + '//' + commentId;
			this.$('.actions .permalink').attr('href', href);
		},
		renderContextLink: function () {
			var linkId = this.watch.get('link_id').substring(3);
			var commentId = this.watch.get('id');
			var href = 'http://www.reddit.com/comments/' + linkId + '//' + commentId + '?context=99';
			this.$('.actions .context').attr('href', href);
		},
		renderFullCommentsLink: function () {
			var linkId = this.watch.get('link_id').substring(3);
			var href = 'http://www.reddit.com/comments/' + linkId;
			this.$('.actions .full-comments').attr('href', href);
		},
		getFaviconURL: function (url) {
			return FAVICON_BASE_URL + encodeURIComponent(url);
		},
		start: function () {
			this.stop();
			this.inlineLinkAuthorUserView.start();
			this.inlineCommentAuthorUserView.start();
			this.inlineSubredditView.start();
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.inlineLinkAuthorUserView.stop();
			this.inlineCommentAuthorUserView.stop();
			this.inlineSubredditView.stop();
		}
	});
	return FullCommentView;
});