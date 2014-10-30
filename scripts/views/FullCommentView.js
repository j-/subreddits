define(function (require) {
	// libs
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	// models
	var LinkModel = require('models/LinkModel');
	var AccountModel = require('models/AccountModel');
	var SubredditModel = require('models/SubredditModel');
	// views
	var LinkTitleView = require('views/LinkTitleView');
	var InlineUserView = require('views/InlineUserView');
	var InlineSubredditView = require('views/InlineSubredditView');
	var TimeView = require('views/TimeView');
	// templates
	var html = require('text!templates/FullComment.html');
	var FullCommentView = ok.$View.extend({
		className: 'comment full-comment',
		init: function () {
			this.linkModel = new LinkModel();
			this.linkModel.set('id', this.watch.get('link_id').substring(3));
			this.linkModel.setProperty('title', this.watch.getProperty('link_title'));
			this.linkModel.setProperty('url', this.watch.getProperty('link_url'));
			this.linkAuthorModel = new AccountModel({
				name: this.watch.get('link_author')
			});
			this.commentAuthorModel = new AccountModel({
				name: this.watch.get('author')
			});
			this.subreddit = new SubredditModel({
				display_name: this.watch.get('subreddit')
			});
			this.linkTitleView = new LinkTitleView({
				watch: this.linkModel
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
			this.timeView = new TimeView({
				watch: this.watch.getProperty('created_utc')
			});
		},
		render: function () {
			this.empty();
			this.$el
				.html(html);
			this.renderLinkTitle();
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
			this.linkTitleView.setElement(this.$('.link-title'));
			this.linkTitleView.render();
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
			this.timeView.setElement(this.$('.comment-time'));
			this.timeView.render();
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
		start: function () {
			this.stop();
			this.linkTitleView.start();
			this.inlineLinkAuthorUserView.start();
			this.inlineCommentAuthorUserView.start();
			this.inlineSubredditView.start();
			this.timeView.start();
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.linkTitleView.stop();
			this.inlineLinkAuthorUserView.stop();
			this.inlineCommentAuthorUserView.stop();
			this.inlineSubredditView.stop();
			this.timeView.stop();
		}
	});
	return FullCommentView;
});