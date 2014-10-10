define(function (require) {
	var ok = require('ok');
	var SubredditView = require('views/SubredditView');
	var MultiredditView = require('views/MultiredditView');
	var SubredditModel = require('models/SubredditModel');
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
	return MultiredditListView;
});