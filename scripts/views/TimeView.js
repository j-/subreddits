define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var moment = require('moment');
	var TimeView = ok.$View.extend({
		render: function () {
			var date = this.watch.get();
			var now = new Date();
			var diff = date - now;
			var humanized = moment.duration(diff).humanize(true);
			this.$el
				.text(humanized)
				.attr('title', date.toLocaleString())
				.attr('datetime', date.toISOString());
		}
	});
	return TimeView;
});