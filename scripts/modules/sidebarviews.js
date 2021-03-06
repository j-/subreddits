define(function (require, exports) {
	var ok = require('ok');
	require('ok.views');
	var $ = require('jquery');
	var _ = require('underscore');
	var pagerouter = require('modules/pagerouter');
	var SubredditModel = require('models/SubredditModel');
	var InlineSubredditView = require('views/InlineSubredditView');

	var SubredditTextView = InlineSubredditView.extend({
		render: function () {
			InlineSubredditView.prototype.render.call(this);
			$(this.el).attr('tabindex', -1);
		}
	});

	var SubredditView = ok.View.extend({
		tagName: 'li',
		className: 'subreddit',
		init: function () {
			this.subredditIdView = new SubredditTextView({
				watch: this.watch
			});
		},
		render: function () {
			this.empty();
			this.subredditIdView.render();
			var $details = $('<div/>')
				.addClass('details')
				.append(this.subredditIdView.el);
			$(this.el)
				.append($details);
		},
		handleMousedownDetails: function (e) {
			e.stopPropagation();
			$(this.subredditIdView.el).focus();
		},
		start: function () {
			this.stop();
			$(this.el).on('mousedown', '.details', _.bind(this.handleMousedownDetails, this));
			this.subredditIdView.start();
		},
		stop: function () {
			ok.View.prototype.stop.call(this);
			$(this.el).off('mousedown', '.details');
		}
	});

	var MultiredditTextView = ok.SimpleView.extend({
		tagName: 'a',
		className: 'multireddit-name',
		render: function () {
			var name = this.watch.get('name');
			var subreddits = this.watch.toString();
			$(this.el)
				.attr('tabindex', -1)
				.attr('href', 'http://www.reddit.com/r/' + subreddits)
				.text(name);
		},
		handleClick: function (e) {
			if (!e.ctrlKey) {
				e.preventDefault();
				var subreddits = this.watch.toString();
				pagerouter.go('/r/' + subreddits);
			}
		},
		start: function () {
			ok.SimpleView.prototype.start.call(this);
			$(this.el).on('click', _.bind(this.handleClick, this));
		},
		stop: function () {
			ok.SimpleView.prototype.stop.call(this);
			$(this.el).off('click');
		}
	});

	var MultiredditListView = ok.CollectionView.extend({
		tagName: 'ul',
		className: 'subreddits',
		defaultConstructor: SubredditView,
		getConstructor: function (item) {
			if (item instanceof SubredditModel) {
				return SubredditView;
			}
			else {
				return MultiredditView;
			}
		}
	});

	var MultiredditView = ok.View.extend({
		tagName: 'li',
		className: 'multireddit',
		init: function () {
			this.childrenView = new MultiredditListView({
				watch: this.watch.properties.children
			});
			this.nameView = new MultiredditTextView({
				watch: this.watch
			});
			this.$collapse = $('<div/>')
				.attr('tabindex', -1)
				.addClass('collapse-toggle expanded');
		},
		render: function () {
			this.empty();
			this.childrenView.render();
			this.nameView.render();
			var $details = $('<div/>')
				.addClass('details')
				.append(this.$collapse)
				.append(this.nameView.el);
			$(this.el)
				.append($details)
				.append(this.childrenView.el);
		},
		toggleCollapse: function (e) {
			e.preventDefault();
			var $list = $(this.childrenView.el);
			$list.toggle();
			var shown = $list.is(':visible');
			$(this.el)
				.toggleClass('hide-children', !shown);
			this.$collapse
				.toggleClass('expanded', shown);
		},
		hideChildren: function () {
			var $list = $(this.childrenView.el);
			$list.hide();
			$(this.el)
				.addClass('hide-children');
			this.$collapse
				.removeClass('expanded');
		},
		showChildren: function () {
			var $list = $(this.childrenView.el);
			$list.show();
			$(this.el)
				.removeClass('hide-children');
			this.$collapse
				.addClass('expanded');
		},
		isChildrenShown: function () {
			return $(this.childrenView.el).is(':visible');
		},
		handleKeyDown: function (e) {
			// LEFT
			if (e.which === 37) {
				e.preventDefault();
				if (this.isChildrenShown()) {
					this.hideChildren();
				}
				else {
					// go back one level
				}
			}
			// RIGHT
			else if (e.which === 39) {
				e.preventDefault();
				if (this.isChildrenShown()) {
					$(this.childrenView.el).find('a').first().focus();
				}
				else {
					this.showChildren();
				}
			}
		},
		handleMousedownDetails: function (e) {
			e.stopPropagation();
			$(this.nameView.el).focus();
		},
		start: function () {
			this.stop();
			this.childrenView.start();
			this.nameView.start();
			this.$collapse.on('click', _.bind(this.toggleCollapse, this));
			$(this.el).on('mousedown', '.details', _.bind(this.handleMousedownDetails, this));
			$(this.nameView.el).on('keydown', _.bind(this.handleKeyDown, this));
		},
		stop: function () {
			ok.View.prototype.stop.apply(this, arguments);
			this.$collapse.off('click');
			$(this.el).off('mousedown');
			$(this.nameView.el).off('keydown');
		}
	});

	exports.SubredditTextView = SubredditTextView;
	exports.SubredditView = SubredditView;
	exports.MultiredditTextView = MultiredditTextView;
	exports.MultiredditListView = MultiredditListView;
	exports.MultiredditView = MultiredditView;
});