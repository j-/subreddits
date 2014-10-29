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
			this.$el
				.html(html);
			this.renderBody();
		},
		renderBody: function () {
			var html = this.watch.get('body_html');
			html = _.unescape(html);
			this.$('.comment-body').html(html);
		}
	});
	return FullCommentView;
});