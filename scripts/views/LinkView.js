define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var AccountModel = require('models/AccountModel');
	var SubredditModel = require('models/SubredditModel');
	var InlineUserView = require('views/InlineUserView');
	var InlineSubredditView = require('views/InlineSubredditView');
	var embedded = require('modules/embedded');
	var pagerouter = require('modules/pagerouter');
	var html = require('text!templates/Link.html');

	var FAVICON_BASE_URL = '//plus.google.com/_/favicon?domain=';

	var LinkView = ok.$View.extend({
		className: 'link',
		init: function () {
			_.bindAll(this, 'handleClickThumbnail', 'handleClickComments', 'handleClickDomain');
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
			this.embeddedView = null;
			var EmbeddedView = embedded.identify(this.watch);
			if (EmbeddedView) {
				this.embeddedView = new EmbeddedView({
					watch: this.watch
				});
			}
		},
		render: function () {
			this.empty();
			this.$el
				.html(html)
				.toggleClass('over18', this.watch.get('over_18'))
				.toggleClass('stickied', this.watch.get('stickied'));
			this.renderThumbnail();
			this.renderTitle();
			this.renderURL();
			this.renderDomain();
			this.renderScore();
			this.renderCreated();
			this.renderAuthor();
			this.renderComments();
			this.renderSubreddit();
			this.renderEmbeddedMedia();
		},
		renderThumbnail: function () {
			var url = this.watch.get('url');
			var thumbnailUrl = this.watch.get('thumbnail');
			var $thumbnail = this.$('.thumbnail')
				.attr('href', url);
			if (thumbnailUrl) {
				$thumbnail
					.css('background-image', 'url(' + thumbnailUrl + ')')
					.removeClass('empty');
			}
			else {
				$thumbnail
					.css('background-image', null)
					.addClass('empty');
			}
		},
		renderTitle: function () {
			var title = this.watch.get('title');
			title = _.unescape(title);
			this.$('.title-text')
				.text(title);
		},
		renderURL: function () {
			var url = this.watch.get('url');
			this.$('.title')
				.attr('href', url);
			this.$('.favicon')
				.attr('src', this.getFaviconURL(url));
		},
		renderDomain: function () {
			var domain = this.watch.get('domain');
			var href = 'http://www.reddit.com/domain/' + domain;
			this.$('.domain')
				.text(domain)
				.attr('href', href);
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
		renderEmbeddedMedia: function () {
			if (this.embeddedView) {
				this.$el.addClass('has-embedded');
				if (this.showingEmbedded) {
					this.showEmbedded();
				}
			}
		},
		toggleEmbedded: function () {
			if (this.embeddedView) {
				var $embedded = this.$('embedded');
				var showing = this.showingEmbedded;
				if (showing) {
					this.hideEmbedded();
				}
				else {
					this.showEmbedded();
				}
			}
		},
		showEmbedded: function () {
			if (this.embeddedView) {
				this.showingEmbedded = true;
				this.embeddedView.render();
				this.$('.embedded')
					.show()
					.append(this.embeddedView.$el);
				this.$el.addClass('showing-embedded');
			}
		},
		hideEmbedded: function () {
			if (this.embeddedView) {
				this.showingEmbedded = false;
				this.$('.embedded')
					.hide()
					.children()
					.detach();
				this.$el.removeClass('showing-embedded');
			}
		},
		handleClickThumbnail: function (e) {
			if (!e.ctrlKey) {
				e.preventDefault();
				if (this.embeddedView) {
					this.toggleEmbedded();
				}
			}
		},
		handleClickComments: function (e) {
			if (!e.ctrlKey) {
				e.preventDefault();
				var id = this.watch.get('id');
				pagerouter.go('/comments/' + id);
			}
		},
		handleClickDomain: function (e) {
			if (!e.ctrlKey) {
				e.preventDefault();
				var domain = this.watch.get('domain');
				pagerouter.go('/domain/' + domain);
			}
		},
		getFaviconURL: function (url) {
			return FAVICON_BASE_URL + encodeURIComponent(url);
		},
		start: function () {
			this.$el.on('click', '.thumbnail', this.handleClickThumbnail);
			this.$el.on('click', '.comments', this.handleClickComments);
			this.$el.on('click', '.domain', this.handleClickDomain);
			this.inlineSubredditView.start();
			this.inlineUserView.start();
			if (this.embeddedView) {
				this.embeddedView.start();
			}
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('click', '.thumbnail', this.handleClickThumbnail);
			this.$el.off('click', '.comments', this.handleClickComments);
			this.$el.off('click', '.domain', this.handleClickDomain);
			this.inlineSubredditView.stop();
			this.inlineUserView.stop();
			if (this.embeddedView) {
				this.embeddedView.stop();
			}
		}
	});
	return LinkView;
});