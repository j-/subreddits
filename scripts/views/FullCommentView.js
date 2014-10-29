define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var AccountModel = require('models/AccountModel');
	var SubredditModel = require('models/SubredditModel');
	var InlineUserView = require('views/InlineUserView');
	var InlineSubredditView = require('views/InlineSubredditView');
	var html = require('text!templates/FullComment.html');
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
			this.renderBody();
		},
		renderLinkTitle: function () {
			var html = this.watch.get('link_title');
			html = _.unescape(html);
			this.$('.link-title').html(html);
		},
		renderLinkURL: function () {
			var url = this.watch.get('link_url');
			this.$('.link-title').attr('href', url);
		},
		renderLinkAuthor: function () {
			this.inlineLinkAuthorUserView.setElement(this.$('.link-author'));
			this.inlineLinkAuthorUserView.render();
		},
		renderLinkSubreddit: function () {
			this.inlineSubredditView.setElement(this.$('.link-subreddit'));
			this.inlineSubredditView.render();
		},
		renderBody: function () {
			var html = this.watch.get('body_html');
			html = _.unescape(html);
			this.$('.comment-body').html(html);
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