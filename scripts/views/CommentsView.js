define(function (require) {
	var ok = require('ok');
	require('ok.dollarview');
	var LinkView = require('views/LinkView');
	var CommentsView = ok.$View.extend({
		init: function () {
			this.linkView = this.addChildView(LinkView, {
				watch: this.watch.property('link')
			});
		},
		render: function () {
			this.empty();
			this.renderChildViews();
			this.$el.append(this.linkView.$el);
		}
	});
	return CommentsView;
});