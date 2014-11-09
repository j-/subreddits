define(function (require) {
	var ok = require('ok');
	var LinkModel = require('models/LinkModel');
	var Replies = require('collections/Replies');
	var CommentsModel = ok.Map.extend({
		schema: {
			link: LinkModel,
			replies: Replies
		},
		defaults: {
			link: null,
			replies: null
		}
	});
	return CommentsModel;
});