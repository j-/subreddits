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
			this.inlineAuthorUserView = new InlineUserView({
				watch: this.author
			});
			this.timeView = new TimeView({
				watch: this.watch.getProperty('created_utc')
			});
			this.userContentView = new UserContentView({
				watch: this.watch.getProperty('body_html')
			});
			this.goldView = new GoldView({
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
			var $author = this.$('.comment-author');
			this.inlineAuthorUserView.setElement($author);
			this.inlineAuthorUserView.render();
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
		},
		start: function () {
			this.stop();
			this.inlineAuthorUserView.start();
			this.timeView.start();
			this.goldView.start();
			this.userContentView.start();
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.inlineAuthorUserView.stop();
			this.timeView.stop();
			this.goldView.stop();
			this.userContentView.stop();
		}
	});
	return CommentView;
});