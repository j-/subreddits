define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var _ = require('underscore');
	var AccountModel = require('models/AccountModel');
	var SubredditModel = require('models/SubredditModel');
	var InlineUserView = require('views/InlineUserView');
	var InlineSubredditView = require('views/InlineSubredditView');
	var UserContentView = ok.$View.extend({
		className: 'user-content',
		render: function () {
			var html = this.watch.get();
			html = _.unescape(html);
			this.$el.html(html);
			this.replaceLinks();
		},
		replaceLinks: function () {
			var context = this;
			this.$('a').each(function () {
				var $a = $(this);
				context.processLink($a);
			});
		},
		processLink: function ($a) {
			var href = String($a.attr('href'));
			var substr = href.substring(0, 3);
			if (substr === '/u/') {
				this.replaceUserLink($a);
			}
			else if (substr === '/r/') {
				this.replaceSubredditLink($a);
			}
		},
		replaceUserLink: function ($a) {
			var model = new AccountModel({
				name: $a.attr('href').substring(3)
			});
			var view = new InlineUserView({
				watch: model
			});
			view.render();
			$a.replaceWith(view.$el);
		},
		replaceSubredditLink: function ($a) {
			var model = new SubredditModel({
				display_name: $a.attr('href').substring(3)
			});
			var view = new InlineSubredditView({
				watch: model
			});
			view.render();
			$a.replaceWith(view.$el);
		}
	});
	return UserContentView;
});