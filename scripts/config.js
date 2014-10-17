(function () {

var config = {
	baseUrl: 'scripts',
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery',
		'underscore': '../bower_components/underscore/underscore',
		'ok': '../bower_components/ok/ok',
		'ok.views': '../bower_components/ok/ok.views',
		'ok.dollarview': '../bower_components/ok/ok.dollarview',
		'text': '../bower_components/text/text',
		'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
		'signals': '../bower_components/js-signals/dist/signals',
		'crossroads': '../bower_components/crossroads.js/dist/crossroads',
		'marked': '../bower_components/marked/lib/marked'
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
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = config;
}
else if (typeof requirejs !== 'undefined' && requirejs.config) {
	requirejs.config(config);
}

})();