define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var EndOfListingView = ok.$View.extend({
		className: 'end-of-listing',
		update: function () {
			this.$el.toggle(this.watch.get());
		},
		render: function () {
			this.update();
		},
		start: function () {
			this.stop();
			this.watch.on('change', this.update, this);
		}
	});
	return EndOfListingView;
});