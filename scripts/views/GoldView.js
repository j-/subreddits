define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var GoldView = ok.$View.extend({
		render: function () {
			var count = this.watch.get();
			this.empty();
			this.$el.toggle(count > 0);
			if (count > 1) {
				this.$el.text('\xd7' + count); // times
			}
		}
	});
	return GoldView;
});