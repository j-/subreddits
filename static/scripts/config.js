requirejs.config({
	paths: {
		'jquery': '//code.jquery.com/jquery-1.11.1.min',
		'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
		'ok': '//cdn.rawgit.com/j-/ok/0.1.1/ok',
		'ok.views': '//cdn.rawgit.com/j-/ok/0.1.0/ok.views',
		'ok.dollarview': '//cdn.rawgit.com/j-/ok/0.1.0/ok.dollarview',
		'text': '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
		'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min'
	},
	shim: {
		'ok': {
			deps: ['underscore'],
			exports: 'okaylib'
		},
		'ok.views': {
			deps: ['ok'],
			exports: 'okaylib'
		},
		'ok.dollarview': {
			deps: ['ok', 'ok.views', 'jquery'],
			exports: 'okaylib'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'jquery'
		}
	},
	map: {
		'*': {
			'jquery': 'lib/jquery-custom'
		},
		'lib/jquery-custom': {
			'jquery': 'jquery'
		}
	}
});