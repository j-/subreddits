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
	var CommentView = require('views/CommentView');
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
			this.subreddit = new SubredditModel({
				display_name: this.watch.get('subreddit')
			});
			this.linkTitleView = new LinkTitleView({
				watch: this.linkModel
			});
			this.inlineLinkAuthorUserView = new InlineUserView({
				watch: this.linkAuthorModel
			});
			this.inlineSubredditView = new InlineSubredditView({
				watch: this.subreddit
			});
			this.commentView = new CommentView({
				watch: this.watch
			});
		},
		render: function () {
			this.empty();
			this.$el
				.html(html);
			this.renderLinkTitle();
			this.renderLinkAuthor();
			this.renderLinkSubreddit();
			this.renderEntry();
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
		renderEntry: function () {
			this.commentView.setElement(this.$('.entry'));
			this.commentView.render();
		},
		start: function () {
			this.stop();
			this.linkTitleView.start();
			this.inlineLinkAuthorUserView.start();
			this.inlineSubredditView.start();
			this.commentView.start();
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.linkTitleView.stop();
			this.inlineLinkAuthorUserView.stop();
			this.inlineSubredditView.stop();
			this.commentView.stop();
		}
	});
	return FullCommentView;
});