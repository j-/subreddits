define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var AccountModel = require('models/AccountModel');
	var SubredditModel = require('models/SubredditModel');
	var LinkTitleView = require('views/LinkTitleView');
	var InlineUserView = require('views/InlineUserView');
	var InlineSubredditView = require('views/InlineSubredditView');
	var TimeView = require('views/TimeView');
	var GoldView = require('views/GoldView');
	var embedded = require('modules/embedded');
	var pagerouter = require('modules/pagerouter');
	var html = require('text!templates/Link.html');
	var LinkView = ok.$View.extend({
		className: 'link',
		init: function () {
			_.bindAll(this, 'handleClickThumbnail', 'handleClickComments', 'handleClickDomain');
			this.author = new AccountModel({
				name: this.watch.get('author')
			});
			this.subreddit = new SubredditModel({
				display_name: this.watch.get('subreddit')
			});
			this.inlineUserView = this.addChildView(InlineUserView, {
				watch: this.author
			});
			this.linkTitleView = this.addChildView(LinkTitleView, {
				watch: this.watch
			});
			this.inlineSubredditView = this.addChildView(InlineSubredditView, {
				watch: this.subreddit
			});
			this.timeView = this.addChildView(TimeView, {
				watch: this.watch.getProperty('created_utc')
			});
			this.goldView = this.addChildView(GoldView, {
				watch: this.watch.getProperty('gilded')
			});
			this.embeddedView = null;
			var EmbeddedView = embedded.identify(this.watch);
			if (EmbeddedView) {
				this.embeddedView = this.addChildView(EmbeddedView, {
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
			this.renderDomain();
			this.renderScore();
			this.renderCreated();
			this.renderAuthor();
			this.renderComments();
			this.renderSubreddit();
			this.renderGold();
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
			this.linkTitleView.setElement(this.$('.link-title'));
			this.linkTitleView.render();
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
			this.timeView.setElement(this.$('.time'));
			this.timeView.render();
		},
		renderAuthor: function () {
			var distinguished = this.watch.get('distinguished');
			this.inlineUserView.render();
			this.$('.author')
				.empty()
				.append(this.inlineUserView.el);
			if (distinguished) {
				// most likely. subreddit moderator.
				if (distinguished === 'moderator') {
					this.inlineUserView.showModerator();
				}
				// less likely. reddit staff member.
				else if (distinguished === 'admin') {
					this.inlineUserView.showAdmin();
				}
				// least likely. special reddit distinguishment.
				else if (distinguished === 'special') {
					this.inlineUserView.showSpecial();
				}
			}
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
		renderGold: function () {
			this.goldView.setElement(this.$('.gold'));
			this.goldView.render();
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
		start: function () {
			ok.$View.prototype.start.call(this);
			this.stop();
			this.$el.on('click', '.thumbnail', this.handleClickThumbnail);
			this.$el.on('click', '.comments', this.handleClickComments);
			this.$el.on('click', '.domain', this.handleClickDomain);
		},
		stop: function () {
			ok.$View.prototype.stop.call(this);
			this.$el.off('click', '.thumbnail', this.handleClickThumbnail);
			this.$el.off('click', '.comments', this.handleClickComments);
			this.$el.off('click', '.domain', this.handleClickDomain);
		}
	});
	return LinkView;
});