define(function (require) {
	// libs
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	// models
	var LinkModel = require('models/LinkModel');
	var AccountModel = require('models/AccountModel');
	// views
	var InlineUserView = require('views/InlineUserView');
	var TimeView = require('views/TimeView');
	var GoldView = require('views/GoldView');
	var UserContentView = require('views/UserContentView');
	// templates
	var html = require('text!templates/Comment.html');
	var CommentView = ok.$View.extend({
		className: 'entry',
		init: function () {
			this.author = new AccountModel({
				name: this.watch.get('author')
			});
			this.inlineAuthorUserView = this.addChildView(InlineUserView, {
				watch: this.author
			});
			this.timeView = this.addChildView(TimeView, {
				watch: this.watch.getProperty('created_utc')
			});
			this.userContentView = this.addChildView(UserContentView, {
				watch: this.watch.getProperty('body_html')
			});
			this.goldView = this.addChildView(GoldView, {
				watch: this.watch.getProperty('gilded')
			});
		},
		render: function () {
			this.empty();
			this.$el
				.html(html);
			this.renderAuthor();
			this.renderScore();
			this.renderTime();
			this.renderGold();
			this.renderBody();
			this.renderPermalink();
			this.renderContextLink();
			this.renderFullCommentsLink();
		},
		renderAuthor: function () {
			var author = this.watch.get('author');
			var linkAuthor = this.watch.get('link_author');
			var distinguished = this.watch.get('distinguished');
			var $author = this.$('.comment-author');
			this.inlineAuthorUserView.setElement($author);
			this.inlineAuthorUserView.render();
			if (author === linkAuthor) {
				this.inlineAuthorUserView.showSubmitter();
			}
			if (distinguished) {
				// most likely. subreddit moderator.
				if (distinguished === 'moderator') {
					this.inlineAuthorUserView.showModerator();
				}
				// less likely. reddit staff member.
				else if (distinguished === 'admin') {
					this.inlineAuthorUserView.showAdmin();
				}
				// least likely. special reddit distinguishment.
				else if (distinguished === 'special') {
					this.inlineAuthorUserView.showSpecial();
				}
			}
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
		renderGold: function () {
			this.goldView.setElement(this.$('.gold'));
			this.goldView.render();
		},
		renderBody: function () {
			this.userContentView.render();
			this.$('.comment-body').append(this.userContentView.$el);
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
		}
	});
	return CommentView;
});