define(function (require) {
	var ok = require('ok');
	var _ = require('underscore');
	var sync = require('modules/sync');
	var CommentsController = ok.Controller.extend({
		init: function (options) {
			_.extend(this, _.pick(options, 'comments', 'router'));
			_.bindAll(this, 'handleRouteComments');
			this.router.on('route:comments', this.handleRouteComments);
		},
		handleRouteComments: function (id, query) {
			console.log.apply(console, arguments);
		}
	});
	return CommentsController;
});