define(function (require) {
	var EmbeddedView = require('views/embedded/EmbeddedView');
	var $ = require('jquery');
	var marked = require('marked');
	var EmbeddedGithubReadmeView = EmbeddedView.extend({
		className: 'embedded-content embedded-content',
		init: function () {
			this.canFetch = true;
		},
		render: function () {
			this.ensureContent();
		},
		ensureContent: function () {
			if (!this.canFetch) {
				return;
			}
			this.showLoading();
			this.canFetch = false;
			var url = this.watch.get('url');
			var match = url.match(EmbeddedGithubReadmeView.githubProjectExp);
			var author = match[1];
			var project = match[2];
			var url = EmbeddedGithubReadmeView.getProjectURL(author, project);
			$.ajax({
				url: url,
				context: this,
				success: function (response) {
					var content = response.content;
					var decoded = atob(content);
					this.renderContent(decoded);
				},
				error: function (xhr, status, message) {
					this.showError();
					this.canFetch = true;
				}
			});
		},
		renderContent: function (content) {
			var encoded = marked(content);
			this.$el.html(encoded);
		},
		showLoading: function () {
			var $loading = $.create('span')
				.addClass('text-muted')
				.text('Loading\u2026');
			this.empty();
			this.$el.append($loading);
		},
		showError: function () {
			this.$el.text('There was an error loading this readme');
		}
	});
	EmbeddedGithubReadmeView.githubProjectExp = /github.com\/(.*?)\/(.*?)(?:\/|$)/i;
	EmbeddedGithubReadmeView.identify = function (linkModel) {
		var url = linkModel.get('url');
		return EmbeddedGithubReadmeView.githubProjectExp.test(url);
	};
	EmbeddedGithubReadmeView.getProjectURL = function (author, project) {
		return 'https://api.github.com/repos/' + author + '/' + project + '/readme';
	};
	return EmbeddedGithubReadmeView;
});