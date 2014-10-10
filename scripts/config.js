requirejs.config({
	paths: {
		'jquery': '//code.jquery.com/jquery-1.11.1.min',
		'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
		'ok': '//cdn.rawgit.com/j-/ok/0.1.1/ok',
		'ok.views': '//cdn.rawgit.com/j-/ok/0.1.0/ok.views'
	},
	shim: {
		'ok': {
			deps: ['underscore'],
			exports: 'okaylib'
		},
		'ok.views': {
			deps: ['ok'],
			exports: 'okaylib'
		}
	}
});