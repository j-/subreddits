define(function (require) {
	var $ = require('jquery');
	var TabContainerView = require('views/TabContainerView');
	var MultiredditListView = require('modules/sidebarviews').MultiredditListView;
	var SubredditSelector = TabContainerView.extend({
		init: function () {
			this.listView = new MultiredditListView({
				watch: this.watch
			});
		},
		render: function () {
			this.empty();
			this.listView.render();
			$(this.el)
				.attr('tabindex', 0)
				.append(this.listView.el);
		},
		start: function () {
			TabContainerView.prototype.start.apply(this, arguments);
			this.listView.start();
		}
	});
	return SubredditSelector;
});