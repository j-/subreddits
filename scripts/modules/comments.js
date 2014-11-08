define(function (require, exports) {
	var ok = require('ok');
	require('ok.dollarview');
	var ThingModel = require('models/ThingModel');
	var UTCDate = require('properties/UTCDate');

	var Replies = ok.Collection.extend();

	var CommentModel = ThingModel.extend({
		defaults: {
			kind: 't1'
		},
		schema: {
			created_utc: UTCDate,
			replies: Replies
		}
	});

	Replies.defaultConstructor = CommentModel;

	exports.Replies = Replies;
	exports.CommentModel = CommentModel;
});